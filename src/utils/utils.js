import { co2analogies, wateranalogies, energyanalogies } from "./analogies";

export function getConversationId(url) {
  let conversationId = null;
  let supportedSite = false;
  console.log("URL of the site:", url);
  const pathSegments = url.pathname.split("/");
  console.log("Path segments:", pathSegments);

  if (url.hostname.includes("chatgpt.com")) {
    if (pathSegments.length >= 3 && pathSegments[1] === "c") {
      conversationId = pathSegments[2]; // Extract ChatGPT conversation ID
      supportedSite = true;
    }
  } else if (url.hostname.includes("gemini.google.com")) {
    if (pathSegments[1] === "app") {
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

export function getSiteIcon(url) {
  console.log("URL in getSiteIcon:", url);
  if (url.hostname.includes("chatgpt.com")) {
    return "/assets/chatgpt.png";
  } else if (url.hostname.includes("gemini")) {
    return "/assets/gemini.png";
  } else if (
    url.hostname.includes("cloud.google.com") &&
    url.pathname.includes("vertex-ai")
  ) {
    return "/assets/vertexai.png";
  }
  return "unknown";
}

export function animateCount(targetValue, setValue, duration = 1500) {
  const startTime = Date.now();
  const startValue = 0;

  const easeOutQuad = (t) => t * (2 - t);

  const updateCount = () => {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentValue =
      startValue + easeOutQuad(progress) * (targetValue - startValue);

    setValue(currentValue);

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  };

  requestAnimationFrame(updateCount);
}

export function mapMetricToAnalogy(type, value) {
  // Format number with appropriate units and scale
  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toFixed(1);
  }

  switch (type) {
    case "co2": {
      const analogies = co2analogies;

      for (const analogy of analogies) {
        if (value <= analogy.threshold) {
          const quantity = value / analogy.factor;
          let result = analogy.desc.replace(
            "%v",
            quantity.toFixed(quantity < 1 ? 1 : 1)
          );

          if (analogy.desc.includes("h")) {
            result = analogy.desc.replace("%v", quantity.toFixed(1));
          }

          return `${analogy.item}: ${result}`;
        }
      }

      const lastAnalogy = analogies[analogies.length - 1];
      const quantity = value / lastAnalogy.factor;
      return `${lastAnalogy.item}: ${lastAnalogy.desc.replace(
        "%v",
        quantity.toFixed(1)
      )}`;
    }

    case "water": {
      const analogies = wateranalogies;

      for (const analogy of analogies) {
        if (value <= analogy.threshold) {
          const quantity = value / analogy.factor;
          if (quantity < 0.1) {
            return `${analogy.item}: ${
              Math.round(10 / quantity) / 10
            } times smaller`;
          } else {
            return `${analogy.item}: ${quantity.toFixed(
              quantity < 1 ? 1 : 1
            )} ${analogy.desc.replace("%v", "")}`;
          }
        }
      }

      const lastAnalogy = analogies[analogies.length - 1];
      const quantity = value / lastAnalogy.factor;
      return `${lastAnalogy.item}: ${quantity.toFixed(
        1
      )} ${lastAnalogy.desc.replace("%v", "")}`;
    }

    case "energy": {
      const analogies = energyanalogies;

      for (const analogy of analogies) {
        if (value <= analogy.threshold) {
          const quantity = value / analogy.factor;
          if (quantity < 0.1) {
            return `${analogy.item}: ${
              Math.round(10 / quantity) / 10
            } times smaller`;
          } else {
            return `${analogy.item}: ${quantity.toFixed(
              quantity < 1 ? 1 : 1
            )} ${analogy.desc.replace("%v", "")}`;
          }
        }
      }

      const lastAnalogy = analogies[analogies.length - 1];
      const quantity = value / lastAnalogy.factor;
      return `${lastAnalogy.item}: ${quantity.toFixed(
        1
      )} ${lastAnalogy.desc.replace("%v", "")}`;
    }

    default:
      return "No analogy available";
  }
}
