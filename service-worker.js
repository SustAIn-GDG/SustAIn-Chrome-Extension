
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log("Intercepting data from: ", details.url);
    if (details.url.includes("gemini.google.com")) {
      handleGeminiRequest(details);
    } else if (details.url.includes("chatgpt.com/backend-api/conversation")) {
      handleChatGPTRequest(details);
    }
  },
  {
    urls: [
      "https://gemini.google.com/*/StreamGenerate*",
      "https://chatgpt.com/backend-api/conversation",
    ], // Add specific URLs for Gemini and ChatGPT
  },
  ["requestBody"]
);


function handleGeminiRequest(details) {
  console.log("Handling Gemini Request:", details);

  if (details.requestBody && details.requestBody.formData) {
    const formData = details.requestBody.formData;

    // Extract 'f.req' field which contains the request payload
    if (formData["f.req"]) {
      try {
        const requestData = JSON.parse(formData["f.req"][0]); // Extract and parse the first element of 'f.req' array
        console.log("Parsed Gemini Request Data:", requestData);

        // Extract the actual message from the structured data
        const userMessage = JSON.parse(requestData[1])[0][0];
        console.log("User Input to Gemini:", userMessage);
      } catch (error) {
        console.error("Failed to parse Gemini request body:", error);
      }
    } else {
      console.warn("No 'f.req' field found in Gemini request.");
    }
  }
}

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
