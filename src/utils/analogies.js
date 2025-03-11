const co2analogies = [
  {
    threshold: 0.1,
    factor: 0.04,
    item: "🫁 Human breathing",
    desc: "%vh of breathing",
  },
  {
    threshold: 1,
    factor: 1,
    item: "🫁 Daily CO₂",
    desc: "%v of daily exhalation",
  },
  {
    threshold: 5,
    factor: 0.12,
    item: "🚶 Walking",
    desc: "%vkm walked",
  },
  {
    threshold: 25,
    factor: 0.25,
    item: "🚗 Car travel",
    desc: "%vkm by car",
  },
  {
    threshold: 100,
    factor: 50,
    item: "🚌 Bus ride",
    desc: "%v bus journeys",
  },
  {
    threshold: 500,
    factor: 120,
    item: "📱 Smartphone",
    desc: "%v years of use",
  },
  {
    threshold: 1000,
    factor: 200,
    item: "🚿 Hot showers",
    desc: "%v years of showers",
  },
  {
    threshold: 5000,
    factor: 500,
    item: "✈️ Flight",
    desc: "%v hour-long flights",
  },
  {
    threshold: 20000,
    factor: 1800,
    item: "🏠 Home emissions",
    desc: "%v months at home",
  },
  {
    threshold: 100000,
    factor: 20000,
    item: "🚗 Annual driving",
    desc: "%v years in a car",
  },
  {
    threshold: Infinity,
    factor: 4500000,
    item: "🏙️ Town emissions",
    desc: "%v days for a town",
  },
];

const wateranalogies = [
  {
    threshold: 0.5,
    factor: 0.25,
    item: "🥛 Glass of water",
    desc: "%v glasses",
  },
  {
    threshold: 2,
    factor: 2,
    item: "🥤 Drinking water",
    desc: "%v days of drinking",
  },
  {
    threshold: 10,
    factor: 9,
    item: "🚿 Shower",
    desc: "%v min shower",
  },
  {
    threshold: 150,
    factor: 150,
    item: "🛁 Bath",
    desc: "%v baths",
  },
  {
    threshold: 400,
    factor: 300,
    item: "🚽 Toilet",
    desc: "%v flushes",
  },
  {
    threshold: 1000,
    factor: 650,
    item: "🧺 Laundry",
    desc: "%v loads",
  },
  {
    threshold: 5000,
    factor: 4500,
    item: "🌱 Garden",
    desc: "%v garden waterings",
  },
  {
    threshold: 15000,
    factor: 15000,
    item: "🏠 Household",
    desc: "%v days for a family",
  },
  {
    threshold: 100000,
    factor: 100000,
    item: "🏊 Pool",
    desc: "%v backyard pools",
  },
  {
    threshold: 1000000,
    factor: 1000000,
    item: "🌊 Olympic pool",
    desc: "%v Olympic pools",
  },
  {
    threshold: Infinity,
    factor: 10000000,
    item: "💧 Village water",
    desc: "%v days for a village",
  },
];

const energyanalogies = [
  {
    threshold: 12,
    factor: 10,
    item: "📱 Phone charge",
    desc: "%v charges",
  },
  {
    threshold: 60,
    factor: 60,
    item: "💡 Light bulb",
    desc: "%v hours",
  },
  {
    threshold: 200,
    factor: 200,
    item: "💻 Laptop",
    desc: "%v workdays",
  },
  {
    threshold: 1000,
    factor: 1000,
    item: "🍳 Oven",
    desc: "%v hours of use",
  },
  {
    threshold: 2000,
    factor: 2000,
    item: "♨️ Laundry",
    desc: "%v loads",
  },
  {
    threshold: 5000,
    factor: 5000,
    item: "❄️ Refrigerator",
    desc: "%v days",
  },
  {
    threshold: 30000,
    factor: 30000,
    item: "🏠 Home use",
    desc: "%v days",
  },
  {
    threshold: 100000,
    factor: 100000,
    item: "🚗 EV charge",
    desc: "%v full charges",
  },
  {
    threshold: 1000000,
    factor: 1000000,
    item: "⚡ Home power",
    desc: "%v months",
  },
  {
    threshold: 10000000,
    factor: 8760000,
    item: "🏭 Factory",
    desc: "%v years",
  },
  {
    threshold: Infinity,
    factor: 87600000,
    item: "🏙️ Town power",
    desc: "%v days for a town",
  },
];

export { co2analogies, wateranalogies, energyanalogies };
