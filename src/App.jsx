import Header from "./components/Header";
import MetricsDisplay from "./components/MetricsDisplay";
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

export default function Popup() {
  const [conversationId, setConversationId] = useState(null);
  const [co2, setCo2] = useState(null);
  const [water, setWater] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [compatability, setCompatability] = useState(null);

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
        const conversation = await fetchConversationFromChromeStorage(conversationId);

        if (!conversation) {
          console.log(
            "Conversation ID not found in extension storage...So returning metrics from local storage", conversation
          );
          const metrics =
            getConversationMetricsFromBrowserStorage(conversationId);
          if (metrics == null) {
            console.error("Conversatiom metrics not found in browser storage!");
            setIsLoading(false);
            // TODO: In this scenario, we should prompt the user to continue chating with the application and click again.
            return;
          }
          setCo2(metrics.CarbonEmission);
          setWater(metrics.WaterConsumption);
          setEnergy(metrics.EnergyConsumption);
          console.log("Metrics retrived from browser storage :)");
          setIsLoading(false);
          return;
        }
        try {
          const res = await sendConversationToBackend(
            conversation,
            conversationId
          );

          console.log("Metrics received:", res);
          saveConversationToBrowserStorage(conversationId, res);
          setTimeout(() => {
            const metrics =
              getConversationMetricsFromBrowserStorage(conversationId);
            if (metrics == null) {
              console.error(
                "Conversatiom metrics not found in browser storage!"
              );
              return;
            }
            setCo2(metrics.CarbonEmission);
            setWater(metrics.WaterConsumption);
            setEnergy(metrics.EnergyConsumption);
            console.log("Metrics retrived from browser storage :)");
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

  return (
    <main className="overflow-hidden text-black bg-white w-[360px] max-w-[360px] font-sans h-full flex flex-col">
      {/* Green Gradient Background */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-teal-300 to-teal-400 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <Header />

        <div className="flex-grow flex items-center justify-center px-6">
          {isLoading ? (
            <div className="mt-2">
              <AnimatedLoader />
            </div>
          ) : compatability ? (
            <div className="text-center p-4 bg-white rounded-lg shadow-md mt-4">
              <h3 className="font-bold text-lg text-teal-600 mb-2">
                Welcome to SustAIn!
              </h3>
              <p className="mb-2">
                We track the environmental impact of your AI conversations.
              </p>
              <div className="bg-teal-50 p-3 rounded-md border border-teal-200 mt-1">
                <p className="font-medium text-teal-700">To get started:</p>
                <p className="mt-1 text-teal-600">
                  Visit an AI chat platform like ChatGPT, Claude, or Bard and
                  start a conversation.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Currently supporting ChatGPT, Claude, Bard, and other popular AI
                assistants.
              </p>
            </div>
          ) : (
            <MetricsDisplay
              siteIcon={siteIcon}
              conversationID={conversationId}
              currentCO2={co2}
              currentWater={water}
              currentEnergy={energy}
            />
          )}
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
