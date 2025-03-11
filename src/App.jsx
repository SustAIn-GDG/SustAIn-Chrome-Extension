"use client";

import { useEffect, useState } from "react";
import {
  getConversationId,
  fetchConversationFromStorage,
  // sendConversationToBackend,
  simulateBackend,
} from "./utils/utils";
import Header from "./components/header";
import MetricsDisplay from "./components/metricsDisplay";
import Footer from "./components/footer";

export default function Popup() {
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
    <main className="overflow-hidden text-black bg-white w-[300px] max-w-[300px]">
      <div className="flex relative flex-col w-full aspect-[0.576]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a451c8ccf732a92ae7722c4ede7f8115e22b11d9b8212f5a2288f82bb9b48fe8?placeholderIfAbsent=true"
          alt="Background"
          className="object-cover absolute inset-0 size-full"
          aria-hidden="true"
        />
        <Header />
        <MetricsDisplay />
        <Footer />
      </div>
    </main>
  );
}
