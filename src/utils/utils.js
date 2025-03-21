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

/* conversationMetrics will be a object with structure:
  {
    CarbonEmission: Number,
    EnergyConsumption: Number,
    WaterConsumption: Number,
  }
*/
export function saveConversationToBrowserStorage(
  conversationId,
  conversationMetrics
) {
  try {
    // Get existing conversations or initialize empty object
    const existingData = localStorage.getItem("sustAIn_conversations");
    console.log("Data from local storage", existingData, conversationMetrics);
    const conversations = existingData ? JSON.parse(existingData) : {};

    if (conversations.hasOwnProperty(conversationId)) {
      // Update existing metrics by adding the new values
      conversations[conversationId].CarbonEmission =
        Number(conversations[conversationId].CarbonEmission) +
        Number(conversationMetrics.CarbonEmission);
      conversations[conversationId].EnergyConsumption =
        Number(conversations[conversationId].EnergyConsumption) +
        Number(conversationMetrics.EnergyConsumption);
      conversations[conversationId].WaterConsumption =
        Number(conversations[conversationId].WaterConsumption) +
        Number(conversationMetrics.WaterConsumption);
    } else {
      // Add as new entry if not present
      conversations[conversationId] = {
        CarbonEmission: Number(conversationMetrics.CarbonEmission),
        EnergyConsumption: Number(conversationMetrics.EnergyConsumption),
        WaterConsumption: Number(conversationMetrics.WaterConsumption),
      };
    }

    localStorage.setItem(
      "sustAIn_conversations",
      JSON.stringify(conversations)
    );
    console.log("Saved conversation to browser localStorage:", conversationId);
  } catch (error) {
    console.error("Error saving to browser localStorage:", error);
  }
}

export function getConversationMetricsFromBrowserStorage(conversationId) {
  try {
    // Get existing conversations from localStorage
    const existingData = localStorage.getItem("sustAIn_conversations");
    const conversations = existingData ? JSON.parse(existingData) : {};

    // Check if conversationId exists
    if (!conversations.hasOwnProperty(conversationId)) {
      console.warn(`Conversation ID '${conversationId}' not found.`);
      return null;
    }

    console.log(
      "Retrieved conversation metrics:",
      conversations[conversationId]
    );
    return conversations[conversationId];
  } catch (error) {
    console.error("Error retrieving from browser localStorage:", error);
    return null;
  }
}

export function fetchConversationFromChromeStorage(conversationId) {
  // First try to get the conversations from chrome.storage (extension storage)
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("conversations", function (result) {
      console.log("Result:", result);
      let conversations = result.conversations;
      if (conversations && conversations[conversationId]) {
        resolve({ [conversationId]: conversations[conversationId] });
      } else {
        resolve(null);
      }
    });
  });
}

export async function sendConversationToBackend(
  conversationData,
  conversationId
) {
  return await fetch("https://sust-ai-n-backend-f7t69cf5v-thanus-kumaars-projects.vercel.app/calculate_metrics", {
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
      console.log("Data recieved successfully:", data);
      deleteConversationFromChromeStorage(conversationId);
      return data;
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      throw error;
    });
}

export function deleteConversationFromChromeStorage(conversationId) {
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
