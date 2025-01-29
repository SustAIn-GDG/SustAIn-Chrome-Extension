
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log("Intercepting data from: ", details.url);
    if (details.url.includes("gemini.google.com")) {
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
      "https://chatgpt.com/backend-api/conversation",
    ], // Add specific URLs for Gemini and ChatGPT
  },
  ["requestBody"]
);

function handleChatGPTRequest(details) {
  console.log("Handling ChatGPT Request:", details);

  if (details.requestBody) {
    const decoder = new TextDecoder("utf-8");
    const requestBody = details.requestBody.raw
      ? decoder.decode(details.requestBody.raw[0].bytes)
      : null;

    if (requestBody) {
      try {
        const payload = JSON.parse(requestBody);
        console.log(payload);
        // Extracting specific fields
        const action = payload.action;
        const model = payload.messages[0]?.model || payload.model;
        const data = payload.messages[0]?.content?.parts || [];
        const conversationId = payload.conversation_id;

        console.log("Extracted ChatGPT Data:");
        console.log("Action:", action);
        console.log("Model:", model);
        console.log("Data:", data);
        console.log("Conversation ID:", conversationId);
      } catch (error) {
        console.error("Failed to parse ChatGPT request body:", error);
      }
    }
  }
}
