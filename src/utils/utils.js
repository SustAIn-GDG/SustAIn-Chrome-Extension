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

export function saveConversationToBrowserStorage(
  conversationId,
  conversationData
) {
  try {
    // Get existing conversations or initialize empty object
    const existingData = localStorage.getItem("sustAIn_conversations");
    const conversations = existingData ? JSON.parse(existingData) : {};

    // Add/update the conversation
    conversations[conversationId] = conversationData;

    // Save back to localStorage
    localStorage.setItem(
      "sustAIn_conversations",
      JSON.stringify(conversations)
    );
    console.log("Saved conversation to browser localStorage:", conversationId);
  } catch (error) {
    console.error("Error saving to browser localStorage:", error);
  }
}

export function fetchConversationFromStorage(conversationId, callback) {
  // First try to get from chrome.storage (extension storage)
  chrome.storage.local.get("conversations", function (result) {
    if (result.conversations && result.conversations[conversationId]) {
      const conversationData = {
        [conversationId]: result.conversations[conversationId],
      };

      // Also save to browser localStorage for persistence
      saveConversationToBrowserStorage(
        conversationId,
        result.conversations[conversationId]
      );

      callback(conversationData);
    } else {
      console.log(
        "Conversation not found in extension storage, checking browser localStorage..."
      );

      // If not in chrome.storage, try to get from browser localStorage
      try {
        const localData = localStorage.getItem("sustAIn_conversations");
        if (localData) {
          const parsedData = JSON.parse(localData);
          if (parsedData && parsedData[conversationId]) {
            console.log(
              "Found conversation in browser localStorage:",
              conversationId
            );
            callback({ [conversationId]: parsedData[conversationId] });

            // Sync back to chrome.storage for future use
            chrome.storage.local.get("conversations", function (chromeResult) {
              const conversations = chromeResult.conversations || {};
              conversations[conversationId] = parsedData[conversationId];
              chrome.storage.local.set({ conversations }, function () {
                console.log(
                  "Synced conversation from localStorage to chrome.storage"
                );
              });
            });

            return;
          }
        }

        console.error(
          "Conversation not found in any storage for ID:",
          conversationId
        );
        callback(null);
      } catch (error) {
        console.error("Error accessing browser localStorage:", error);
        callback(null);
      }
    }
  });
}

export function sendConversationToBackend(conversationData, conversationId) {
  return fetch("http://localhost:8080/calculate_metrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conversationData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send data to the backend.");
      }
      console.log("Response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data sent successfully:", data);
      deleteConversationFromStorage(conversationId);
      return data;
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      throw error;
    });
}

export function deleteConversationFromStorage(conversationId) {
  // Delete from chrome.storage
  chrome.storage.local.get("conversations", function (result) {
    if (result.conversations) {
      delete result.conversations[conversationId];

      chrome.storage.local.set(
        { conversations: result.conversations },
        function () {
          console.log(
            "Deleted conversation from chrome storage:",
            conversationId
          );
        }
      );
    }
  });

  // Also delete from browser localStorage
  try {
    const localData = localStorage.getItem("sustAIn_conversations");
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData && parsedData[conversationId]) {
        delete parsedData[conversationId];
        localStorage.setItem(
          "sustAIn_conversations",
          JSON.stringify(parsedData)
        );
        console.log(
          "Deleted conversation from browser localStorage:",
          conversationId
        );
      }
    }
  } catch (error) {
    console.error("Error deleting from browser localStorage:", error);
  }
}

// Rest of your utility functions remain unchanged
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
  // Existing function unchanged
  switch (type) {
    case "co2": {
      const analogies = co2analogies;

      for (const analogy of analogies) {
        // Adjusted threshold comparison to match the gram scale
        if (value <= analogy.threshold * 100) {
          // scale threshold by 100 (adjust as needed)
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

export function extrapolateMetrics(
  co2Value,
  waterValue,
  energyValue,
  queries = 10000000,
  timeframe = "day"
) {
  // Existing function unchanged
  // Calculate extrapolation factor
  const factor = queries;

  // CO2: reasonable scaling (2.5kg → 25,000 tons for 10M queries)
  const totalCO2 = (co2Value * factor) / 1000; // Convert to tons

  // Water: reasonable scaling (1200L → 12 billion liters for 10M queries)
  const totalWater = (waterValue * factor) / 1000000; // Convert to million liters

  // Energy: corrected scaling (80kWh → 800 GWh, not 800,000)
  const totalEnergy = (energyValue * factor) / 1000000; // Convert to GWh

  // Calculate real-world equivalents with realistic values
  // Average car emits ~5 tons CO2/year
  const carsPerYear = Math.round(totalCO2 / 5);

  // ~50L per person per day → 12B liters would supply ~240M people for a day
  // This is still high, let's make it more realistic
  const peopleWaterPerDay = Math.round((totalWater * 1000000) / 150); // 150L per person per day is more realistic

  // Average home uses ~30kWh per day
  const homesPerDay = Math.round((totalEnergy * 1000) / 30); // 30kWh per home per day

  // Format numbers for readability
  const formatNumber = (num) => {
    if (num >= 1000000) return `${Math.round(num / 100000) / 10}M`;
    if (num >= 1000) return `${Math.round(num / 100) / 10}k`;
    return Math.round(num);
  };

  // Build the paragraph with properly scaled metrics
  return `In a ${timeframe}, ${formatNumber(
    queries
  )} AI queries emit ${formatNumber(totalCO2)} tons of CO₂ (${formatNumber(
    carsPerYear
  )} cars/year), use ${formatNumber(
    totalWater
  )}M liters of water (${formatNumber(
    peopleWaterPerDay
  )} people/day), and consume ${totalEnergy.toFixed(
    1
  )} GWh of energy (powers ${formatNumber(homesPerDay)} homes/day).`;
}
