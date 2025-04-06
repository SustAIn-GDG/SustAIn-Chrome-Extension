import Header from "./components/Header";
import {
  MetricsDisplay,
  AggregateMetricsDisplay,
} from "./components/MetricsDisplay";
import AnimatedLoader from "./components/animatedLoader";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  fetchConversationFromChromeStorage,
  getConversationId,
  getConversationMetricsFromBrowserStorage,
  getSiteIcon,
  saveConversationToBrowserStorage,
  sendConversationToBackend,
} from "./utils/utils";
import ErrorCard from "./components/errorCard";
import InfoCard from "./components/informationCard";

export default function Popup() {
  const [conversationId, setConversationId] = useState(null);
  const [co2, setCo2] = useState(null);
  const [water, setWater] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [compatability, setCompatability] = useState(null);
  const [errorFromBackend, setErrorFromBackend] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [showAggregateMetrics, setShowAggregateMetrics] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the active tab
        const tabs = await new Promise((resolve) => {
          chrome.tabs.query({ active: true, currentWindow: true }, resolve);
        });

        if (!tabs || tabs.length === 0) {
          throw new Error("No active tab found.");
        }

        const tab = tabs[0];
        const url = new URL(tab.url);
        const { conversationId, supportedSite } = getConversationId(url);

        if (!supportedSite) {
          setCompatability("Unsupported site or invalid conversation ID.");
          throw new Error("Unsupported site or invalid conversation ID.");
        }

        setConversationId(conversationId);
        setSiteIcon(getSiteIcon(url));

        // Fetch conversation data
        const conversation = await fetchConversationFromChromeStorage(
          conversationId
        );

        if (!conversation) {
          console.log(
            "Conversation ID not found in extension storage...So returning metrics from local storage",
            conversation
          );
          const metrics =
            getConversationMetricsFromBrowserStorage(conversationId);
          if (metrics == null) {
            console.error("Conversation metrics not found in browser storage!");
            setIsLoading(false);
            setIsStart(true);
            return;
          } else setIsStart(false);

          setCo2(metrics.CarbonEmission);
          setWater(metrics.WaterConsumption);
          setEnergy(metrics.EnergyConsumption);
          console.log("Metrics retrieved from browser storage :)");
          setIsLoading(false);
          return;
        }
        try {
          const res = await sendConversationToBackend(
            conversation,
            conversationId
          );
          if (res == "ERROR") {
            setErrorFromBackend(true);
          } else {
            console.log("Metrics received:", res);
            saveConversationToBrowserStorage(conversationId, res);
            setErrorFromBackend(false);
          }
          setTimeout(() => {
            const metrics =
              getConversationMetricsFromBrowserStorage(conversationId);
            if (metrics == null) {
              console.error(
                "Conversation metrics not found in browser storage!"
              );
              return;
            }
            setCo2(metrics.CarbonEmission);
            setWater(metrics.WaterConsumption);
            setEnergy(metrics.EnergyConsumption);
            console.log("Metrics retrieved from browser storage :)");
            setIsLoading(false);
          }, 1000);
        } catch (err) {
          console.error("Error sending data:", err);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAggregateMetrics = () => {
    // Add a transition state to manage the animation
    setIsTransitioning(true);

    // Delay the actual state change to allow exit animations to complete
    setTimeout(() => {
      setShowAggregateMetrics(!showAggregateMetrics);
      setIsTransitioning(false);
    }, 300); // Adjust timing as needed
  };

  return (
    <main className="overflow-hidden text-black bg-white w-[360px] max-w-[360px] font-sans h-full flex flex-col">
      {/* Green Gradient Background with subtle animation */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-teal-300 to-teal-400 z-0 animate-gradient-shift" />

      <div className="relative z-10 flex flex-col h-full overflow-hidden">
        <Header />

        <div className="flex-grow flex items-center justify-center px-6 transition-all duration-500">
          {isLoading ? (
            <div className="mt-2 animate-in fade-in duration-500">
              <AnimatedLoader />
            </div>
          ) : compatability ? (
            <div className="text-center p-4 bg-white rounded-lg shadow-md mt-4 animate-in fade-in slide-in-from-bottom duration-500">
              <h3 className="font-bold text-lg text-teal-600 mb-2">
                Welcome to SustAIn!
              </h3>
              <p className="mb-2">
                We track the environmental impact of your AI conversations.
              </p>
              <div className="bg-teal-50 p-3 rounded-md border border-teal-200 mt-1">
                <p className="font-medium text-teal-700">To get started:</p>
                <p className="mt-1 text-teal-600">
                  Visit an AI chat platform like ChatGPT or Gemini and start a
                  conversation.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Currently supporting ChatGPT, Gemini and Google AI Studio.
              </p>
            </div>
          ) : errorFromBackend == false ? (
            isStart == false ? (
              <div
                className={`w-full transition-all duration-300 ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                {showAggregateMetrics ? (
                  <AggregateMetricsDisplay onClose={toggleAggregateMetrics} />
                ) : (
                  <MetricsDisplay
                    siteIcon={siteIcon}
                    conversationID={conversationId}
                    currentCO2={co2}
                    currentWater={water}
                    currentEnergy={energy}
                    onToggleAggregateView={toggleAggregateMetrics}
                  />
                )}
              </div>
            ) : (
              <InfoCard />
            )
          ) : (
            <ErrorCard />
          )}
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
