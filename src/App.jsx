import { useEffect, useState } from "react";
import {
  getConversationId,
  fetchConversationFromStorage,
  // sendConversationToBackend,
  simulateBackend,
} from "./utils/utils";
import Header from "./components/header";

function Popup() {
  const [conversationId, setConversationId] = useState(null);
  const [co2, setCo2] = useState(null);
  const [water, setWater] = useState(null);
  const [energy, setEnergy] = useState(null);

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
        console.error("Unsupported site or invalid conversation ID.");
        return;
      }

      setConversationId(conversationId);

      fetchConversationFromStorage(conversationId, (conversationData) => {
        // sendConversationToBackend(conversationData, conversationId);
        const res = simulateBackend(conversationData, conversationId);
        setCo2(res.CO2);
        setWater(res.Water);
        setEnergy(res.Energy);
      });
    });
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-lg w-[400px] h-auto">
      <Header />
      <p className="text-black">
        Conversation ID: {conversationId || "None found"}
      </p>
      <p className="text-black">CO2: {co2 || "N/A"}</p>
      <p className="text-black">Water: {water || "N/A"}</p>
      <p className="text-black">Energy: {energy || "N/A"}</p>
    </div>
  );
}

export default Popup;
