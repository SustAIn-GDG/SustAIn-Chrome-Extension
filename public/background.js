let global_conversation_id = "";
let requestResponseGap;

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (details.ip) {
      console.log("IP address of cloud server: ", details.ip);
      updateServerIp(global_conversation_id, details.ip);
      global_conversation_id = "";
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
    requestResponseGap = Date.now();
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
        global_conversation_id = conversationId;
        storeConversation(conversationId, userMessage, "Gemini 2.0 Flash");
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
    pathSegments.length === 4 &&
    pathSegments[2] === "conversation" &&
    details.method === "GET"
  ) {
    const conversationId = pathSegments[3];
    console.log("New Conversation ID:", conversationId);
  } else if (details.requestBody && pathSegments.length === 3) {
    const decoder = new TextDecoder("utf-8");
    const requestBody = details.requestBody.raw
      ? decoder.decode(details.requestBody.raw[0].bytes)
      : null;

    if (requestBody) {
      try {
        const payload = JSON.parse(requestBody);
        const model =
          payload.messages[0]?.model || payload?.model || "No model found";
        const conversationId =
          payload?.conversation_id || "Conversation ID not found";
        const message = payload.messages[0];
        const parts = message.content?.parts || [];

        // Extract user query (assumed to be the last string in `parts`)
        const userQuery =
          parts.filter((part) => typeof part === "string").pop() ||
          "No query found";

        // Check for file upload via attachments or image asset pointer
        const hasFile =
          message.metadata?.attachments?.length > 0 ||
          parts.some(
            (part) =>
              typeof part === "object" &&
              part.content_type === "image_asset_pointer"
          );

        if (payload?.messages?.[0]?.metadata?.attachments?.length > 0) {
          const file = payload.messages[0].metadata.attachments[0];
          const mimeType = file.mime_type;
          const fileName = file.name;

          let fileType = "unknown";
          if (mimeType.startsWith("image/")) {
            fileType = "image";
          } else if (mimeType === "application/pdf") {
            fileType = "pdf";
          } else if (
            mimeType === "application/msword" ||
            mimeType ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            fileType = "document";
          } else if (
            mimeType === "application/vnd.ms-excel" ||
            mimeType ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            fileType = "spreadsheet";
          }

          console.log("File Type:", fileType);
          console.log("File Name:", fileName);
        }

        console.log("Extracted ChatGPT Data:");
        console.log("Model:", model);
        console.log("User Query:", userQuery);
        console.log("Uploaded File:", hasFile);
        console.log("Conversation ID:", conversationId);

        global_conversation_id = conversationId;
        storeConversation(conversationId, userQuery, model);
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

/*
Conversation data structure in storageAPI.
{
  "conv123": {
    "server_ip": "192.168.1.10",
    "queries": [
      { "query": "Hello, how are you?", "model": "GPT-4", time: duration },
      { "query": "What's the weather today?", "model": "GPT-4", time: duration }
    ]
  }
}

*/

function storeConversation(conversationId, query, model) {
  // Retrieve existing conversations
  chrome.storage.local.get("conversations", function (result) {
    let conversations = result.conversations || {}; // Get existing or initialize

    // Initialize conversation if it doesn't exist
    if (!conversations[conversationId]) {
      conversations[conversationId] = {
        server_ip: null,
        queries: [],
      };
    }
    // Add query to the list
    conversations[conversationId].queries.push({
      query: query,
      model: model,
      time: "",
    });
    // Store updated conversations in Chrome storage
    chrome.storage.local.set({ conversations }, function () {
      console.log("Conversation stored successfully:", conversations);
    });
  });
}

function updateServerIp(conversationId, serverIp) {
  // Retrieve existing conversations
  chrome.storage.local.get("conversations", function (result) {
    let conversations = result.conversations || {}; // Get existing or initialize

    // Check if the conversation exists
    if (conversations[conversationId]) {
      // Update the server IP
      conversations[conversationId].server_ip = serverIp;

      const queries = conversations[conversationId].queries;
      if (queries.length > 0) {
        const lastQuery = queries[queries.length - 1];
        lastQuery.time = ((Date.now() - requestResponseGap) / 1000).toFixed(2); // in seconds
      }

      // Store updated conversations in Chrome storage
      chrome.storage.local.set({ conversations }, function () {
        console.log("Server IP updated successfully:", conversations);
      });
    } else {
      console.log("Conversation ID not found:", conversationId);
    }
  });
}
