import MetricCard from "./metricCard";

const MetricsDisplay = () => {
  return (
    <section className="flex relative flex-col self-center pt-4 pb-3 mt-6 w-full rounded-2xl bg-white bg-opacity-90 shadow-lg max-w-[320px] border border-gray-100">
      <div className="flex gap-2 justify-center items-center self-center mb-2 text-base font-medium">
        <div
          className="flex shrink-0 self-stretch my-auto bg-green-500 h-[20px] rounded-full w-[20px]"
          aria-hidden="true"
        />
        <h2 className="self-stretch my-auto w-[210px] font-semibold text-gray-800">
          Current Conversation Usage
        </h2>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>

      <div className="overflow-hidden py-2 w-full space-y-5">
        <MetricCard
          icon="/assets/co2.png"
          value="2.5 kg CO₂"
          description="🚗 Like driving a petrol car for ~12 km"
          gradientBackground="bg-gradient-to-br from-green-50 to-green-200"
        />
        <MetricCard
          icon="/assets/water.png"
          value="12 liters"
          description="🚿 About a 4-minute shower."
          gradientBackground="bg-gradient-to-br from-blue-50 to-blue-200"
        />
        <MetricCard
          icon="/assets/energy.png"
          value="800 Wh (0.8 kWh)"
          description="🔋 Enough to run a laptop for ~16 hours."
          gradientBackground="bg-gradient-to-br from-amber-50 to-amber-200"
        />
      </div>

      <div className="flex flex-col px-4 mt-2">
        <p className="px-3 py-2.5 text-xs leading-relaxed rounded-xl bg-gray-100 text-gray-700">
          In a day, 10M AI queries emit 4,500 tons of CO₂ (900 cars/year), use
          25M liters of water (35,000 people/year), and consume 1.5 GWh of
          energy (powers 50,000 homes/day).
        </p>
        <button className="self-start mt-3 text-xs text-green-600 hover:text-green-800 font-medium transition-colors flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          How we calculate metrics
        </button>
      </div>
    </section>
  );
};

export default MetricsDisplay;
