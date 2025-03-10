import { useEffect, useState } from "react";
import {
  getConversationId,
  fetchConversationFromStorage,
  // sendConversationToBackend,
  simulateBackend,
} from "./utils/utils";

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
    <div className="flex px-8 py-4 rounded-full ">
      <h1>SustAIn</h1>
      <p>Conversation ID: {conversationId || "None found"}</p>
    </div>
  );
}

export default Popup;
