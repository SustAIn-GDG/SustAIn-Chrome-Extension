chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (details.ip) {
      console.log("IP address of cloud server: ", details.ip);
    }
  },
  {
    urls: [
      "https://gemini.google.com/*/StreamGenerate*",
      "https://chatgpt.com/backend-api/conversation",
      "https://alkalimakersuite-pa.clients6.google.com/*/GenerateContent",
    ],
  }, // Captures requests to all URLs
  []
);

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    notifyUser();
    console.log(details);
    if (
      details.url.includes("gemini.google.com") &&
      details.url.includes("StreamGenerate")
    ) {
      handleGeminiRequest(details);
    } else if (details.url.includes("chatgpt.com/backend-api/conversation")) {
      handleChatGPTRequest(details);
    } else if (
      details.url.includes("google.com") &&
      details.url.includes("/GenerateContent")
    ) {
      handleAIStudioRequest(details);
    }
  },
  {
    urls: [
      "https://gemini.google.com/*/StreamGenerate*",
      "https://chatgpt.com/backend-api/conversation/*",
      "https://alkalimakersuite-pa.clients6.google.com/*/GenerateContent",
    ],
  },
  ["requestBody"]
);

// function for hadling Google AI studio requests
function handleAIStudioRequest(details) {
  if (details.requestBody) {
    const decoder = new TextDecoder("utf-8");
    const requestBody = details.requestBody.raw
      ? decoder.decode(details.requestBody.raw[0].bytes)
      : null;

    if (requestBody) {
      try {
        const payload = JSON.parse(requestBody);
        let lastMessage;
        for (let i = 0; i < payload[1].length; i++) {
          const message = payload[1][i];
          if (message && message[1] === "user") {
            lastMessage = message[0][0][1];
          }
        }
        console.log("Last User Query:", lastMessage);
      } catch (error) {
        console.error("Failed to parse Gemini request body:", error);
      }
    }
  }
}

// function for hadling Gemini requests
function handleGeminiRequest(details) {
  if (details.requestBody && details.requestBody.formData) {
    const formData = details.requestBody.formData;

    if (formData["f.req"]) {
      try {
        const requestData = JSON.parse(formData["f.req"][0]);
        const userMessage = JSON.parse(requestData[1])[0][0];
        const conversationId = JSON.parse(requestData[1])[2][0];
        console.log("User Input to Gemini:", userMessage);
        console.log("Conversation id: ", conversationId);
      } catch (error) {
        console.error("Failed to parse Gemini request body:", error);
      }
    } else {
      console.warn("No 'f.req' field found in Gemini request.");
    }
  }
}

// function for hadling ChatGPT requests
function handleChatGPTRequest(details) {
  const url = new URL(details.url);
  const pathSegments = url.pathname.split("/");
  if (
    pathSegments.length == 4 &&
    pathSegments[2] === "conversation" &&
    details.method === "GET"
  ) {
    const conversationId = pathSegments[3]; // Extract conversation ID
    console.log("New Conversation ID:", conversationId);
  } else if (details.requestBody && pathSegments.length == 3) {
    const decoder = new TextDecoder("utf-8");
    const requestBody = details.requestBody.raw
      ? decoder.decode(details.requestBody.raw[0].bytes)
      : null;

    if (requestBody) {
      try {
        const payload = JSON.parse(requestBody);
        // Extracting specific fields
        const model =
          payload.messages[0]?.model || payload?.model || "No model found";
        const data = payload.messages[0]?.content?.parts || "No messages found";
        const conversationId =
          payload?.conversation_id || "Conversation ID not found";

        console.log("Extracted ChatGPT Data:");
        console.log("Model:", model);
        console.log("Data:", data);
        console.log("Conversation ID:", conversationId);
      } catch (error) {
        console.error("Failed to parse ChatGPT request body:", error);
      }
    }
  }
}

function notifyUser() {
  chrome.action.setBadgeText({ text: "NEW" }); // Warning sign emoji
  chrome.action.setBadgeBackgroundColor({ color: "#007acc" }); // Bright orange background
  // Reset badge after 2 seconds
  setTimeout(() => {
    chrome.action.setBadgeText({ text: "" });
  }, 2000);
}
