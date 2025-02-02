chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (!tabs || tabs.length === 0) {
    console.error("No active tab found.");
    return;
  }

  const tab = tabs[0];
  const url = new URL(tab.url);
  let conversationId = null;
  let supportedSite = false;

  // Step 2: Extract conversation ID based on the site
  if (url.hostname.includes("chatgpt.com")) {
    // ChatGPT URL format: https://chatgpt.com/c/{conversationId}
    const pathSegments = url.pathname.split("/");
    if (pathSegments.length >= 3 && pathSegments[1] === "c") {
      conversationId = pathSegments[2]; // Extract the conversation ID
      supportedSite = true;
    }
  } else if (url.hostname.includes("gemini.google.com")) {
    // Gemini URL format: https://gemini.google.com/app/{conversationId}?hl=en-IN
    const pathSegments = url.pathname.split("/");
    if (pathSegments.length >= 3 && pathSegments[1] === "app") {
      conversationId = "c_" + pathSegments[2].split("?")[0]; // Extract conversation ID before query params
      supportedSite = true;
    }
  }

  if (!supportedSite) {
    console.error("Unsupported site or invalid conversation ID.");
    return;
  }

  console.log("Extracted Conversation ID:", conversationId);

  // Step 3: Retrieve the data structure from chrome.storage.local
  chrome.storage.local.get("conversations", function (result) {
    const conversations = result.conversations;

    // Step 4: Check if the conversationId exists and filter the data
    if (conversations && conversations[conversationId]) {
      const filteredConversation = {
        [conversationId]: conversations[conversationId],
      };

      // Step 5: Send the filtered conversation to the backend
      fetch("https://localhost:443/calculate_metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredConversation),
      })
        .then((response) => response.json()) // Assuming backend responds with JSON
        .then((data) => {
          console.log("Data sent successfully:", data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    } else {
      console.error(
        "Conversation not found for the given conversationId:",
        conversationId
      );
    }
  });
});
