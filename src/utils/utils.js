export function getConversationId(url) {
  let conversationId = null;
  let supportedSite = false;

  const pathSegments = url.pathname.split("/");

  if (url.hostname.includes("chatgpt.com")) {
    if (pathSegments.length >= 3 && pathSegments[1] === "c") {
      conversationId = pathSegments[2]; // Extract ChatGPT conversation ID
      supportedSite = true;
    }
  } else if (url.hostname.includes("gemini.google.com")) {
    if (pathSegments.length >= 3 && pathSegments[1] === "app") {
      conversationId = "c_" + pathSegments[2].split("?")[0]; // Extract Gemini conversation ID
      supportedSite = true;
    }
  }

  return { conversationId, supportedSite };
}

export function fetchConversationFromStorage(conversationId, callback) {
  chrome.storage.local.get("conversations", function (result) {
    if (result.conversations && result.conversations[conversationId]) {
      callback({ [conversationId]: result.conversations[conversationId] });
    } else {
      console.error("Conversation not found for ID:", conversationId);
    }
  });
}

export function sendConversationToBackend(conversationData, conversationId) {
  fetch("https://localhost:443/calculate_metrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conversationData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data sent successfully:", data);
      deleteConversationFromStorage(conversationId);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

export function simulateBackend(conversationData, conversationId) {
  console.log("Simulating backend for conversation:", conversationId);
  console.log("Conversation data:", conversationData);
  const res = {
    CO2: parseFloat((Math.random() * 1000000).toFixed(6)),
    Water: parseFloat((Math.random() * 1000000).toFixed(6)),
    Energy: parseFloat((Math.random() * 1000000).toFixed(6)),
  };
  return res;
}

export function deleteConversationFromStorage(conversationId) {
  chrome.storage.local.get("conversations", function (result) {
    if (result.conversations) {
      delete result.conversations[conversationId];

      chrome.storage.local.set(
        { conversations: result.conversations },
        function () {
          console.log("Deleted conversation from storage:", conversationId);
        }
      );
    }
  });
}
