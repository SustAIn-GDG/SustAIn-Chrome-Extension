import MetricCard from "./metricCard";

const MetricsDisplay = () => {
  return (
    <section className="flex relative flex-col self-center pt-2.5 pb-1.5 mt-7 w-full rounded-xl bg-zinc-300 bg-opacity-80 max-w-[273px]">
      <div className="flex gap-1.5 justify-center items-center self-center text-base font-medium">
        <div
          className="flex shrink-0 self-stretch my-auto bg-white h-[19px] rounded-full w-[19px]"
          aria-hidden="true"
        />
        <h2 className="self-stretch my-auto w-[203px]">
          Current Conversation usage
        </h2>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a2f5510a2f4b598e3ff772ab36960c40f8813e62cf1508567d6ce9aa7730dd4?placeholderIfAbsent=true"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-square"
          aria-hidden="true"
        />
      </div>

      <div className="overflow-hidden py-3 mt-2 w-full">
        <MetricCard
          icon="/assets/co2.png"
          value="2.5 kg CO₂"
          description="🚗 Like driving a petrol car for ~12 km"
          gradientBackground="bg-gradient-to-br from-[#D8E2C6] to-[#A4B494]"
        />
        <div className="mt-4.5">
          <MetricCard
            icon="/assets/water.png"
            value="12 liters"
            description="🚿 About a 4-minute shower."
            gradientBackground="bg-gradient-to-br from-[#C9D6DF] to-[#8FA6C6]"
          />
        </div>
        <div className="mt-4.5">
          <MetricCard
            icon="/assets/energy.png"
            value="800 Wh (0.8 kWh)"
            description="🔋 Enough to run a laptop for ~16 hours."
            gradientBackground="bg-gradient-to-br from-[#E6D7C3] to-[#C4A484]"
          />
        </div>
      </div>

      <div className="flex flex-col px-2 font-light">
        <p className="px-1.5 py-1 text-xs rounded-lg bg-zinc-300 bg-opacity-80">
          In a day, 10M AI queries emit 4,500 tons of CO₂ (900 cars/year), use
          25M liters of water (35,000 people/year), and consume 1.5 GWh of
          energy (powers 50,000 homes/day).
        </p>
        <button className="self-start mt-2 text-[9px] underline">
          How we calculate metrics?
        </button>
      </div>
    </section>
  );
};

export default MetricsDisplay;
