import Header from "./components/Header";
import MetricsDisplay from "./components/MetricsDisplay";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  fetchConversationFromStorage,
  getConversationId,
  simulateBackend,
  getSiteIcon,
} from "./utils/utils";

export default function Popup() {
  const [conversationId, setConversationId] = useState(null);
  const [co2, setCo2] = useState(null);
  const [water, setWater] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const tab = tabs[0];
      const url = new URL(tab.url);
      const { conversationId, supportedSite } = getConversationId(url);

      if (!supportedSite) {
        console.log("Unsupported site or invalid conversation ID.");
        return;
      }

      setConversationId(conversationId);

      // Get the site icon based on URL
      setSiteIcon(getSiteIcon(url));

      fetchConversationFromStorage(conversationId, (conversationData) => {
        const res = simulateBackend(conversationData, conversationId);
        setCo2(res.CO2);
        setWater(res.Water);
        setEnergy(res.Energy);
      });
    });
  }, []);

  return (
    <main className="overflow-hidden text-black bg-white w-[360px] max-w-[360px] font-sans">
      <div className="flex relative flex-col w-full">
        {/* Green Gradient Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-gradient-to-b from-teal-300 to-teal-400" />

        <div className="relative z-10 flex flex-col h-full">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <MetricsDisplay siteIcon={siteIcon} />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
