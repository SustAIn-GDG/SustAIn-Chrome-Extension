import { useEffect, useState } from "react";

function Popup() {
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || tabs.length === 0) return;
      const tab = tabs[0];
      const url = new URL(tab.url);
      let id = null;

      if (url.hostname.includes("chatgpt.com")) {
        const pathSegments = url.pathname.split("/");
        if (pathSegments.length >= 3 && pathSegments[1] === "c") {
          id = pathSegments[2];
        }
      } else if (url.hostname.includes("gemini.google.com")) {
        const pathSegments = url.pathname.split("/");
        if (pathSegments.length >= 3 && pathSegments[1] === "app") {
          id = "c_" + pathSegments[2].split("?")[0];
        }
      }

      setConversationId(id);
    });
  }, []);

  return (
    <div className="popup-container">
      <h1>SustAIn</h1>
      <p>Conversation ID: {conversationId || "None found"}</p>
    </div>
  );
}

export default Popup;
