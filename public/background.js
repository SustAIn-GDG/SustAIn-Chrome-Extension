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
  }
);
