import MetricCard from "./metricCard";

const MetricsDisplay = () => {
  return (
    <section className="flex relative flex-col self-center pt-3.5 pb-2 mt-9 w-full rounded-2xl bg-zinc-300 bg-opacity-80 max-w-[364px]">
      <div className="flex gap-2 justify-center items-center self-center text-xl font-medium">
        <div
          className="flex shrink-0 self-stretch my-auto bg-white h-[25px] rounded-[100px] w-[25px]"
          aria-hidden="true"
        />
        <h2 className="self-stretch my-auto w-[271px]">
          Current Conversation usage
        </h2>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a2f5510a2f4b598e3ff772ab36960c40f8813e62cf1508567d6ce9aa7730dd4?placeholderIfAbsent=true"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
          aria-hidden="true"
        />
      </div>

      <div className="overflow-hidden py-4 mt-2.5 w-full">
        <MetricCard
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/28b9ad4693f9272fbbd05404ace5680f3ea76a9a66371589f58c23eff40841d6?placeholderIfAbsent=true"
          value="2.5 kg CO₂"
          description="🚗 Like driving a petrol car for ~12 km"
        />
        <div className="mt-6">
          <MetricCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ccfd2651618c2cc29b98fa5100f0bc79d80c59b4718979f4d146c6ddeb2b62c8?placeholderIfAbsent=true"
            value="12 liters"
            description="🚿 About a 4-minute shower."
          />
        </div>
        <div className="mt-6">
          <MetricCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4d8418c992bc0945f7da99330cf148cfa70da135f3bad77b579e763290f76013?placeholderIfAbsent=true"
            value="800 Wh (0.8 kWh)"
            description="🔋 Enough to run a laptop for ~16 hours."
          />
        </div>
      </div>

      <div className="flex flex-col px-3 font-light">
        <p className="px-2 py-1.5 text-sm rounded-lg bg-zinc-300 bg-opacity-80">
          In a day, 10M AI queries emit 4,500 tons of CO₂ (900 cars/year), use
          25M liters of water (35,000 people/year), and consume 1.5 GWh of
          energy (powers 50,000 homes/day).
        </p>
        <button className="self-start mt-3 text-xs underline">
          How we calculate metrics?
        </button>
      </div>
    </section>
  );
};

export default MetricsDisplay;
