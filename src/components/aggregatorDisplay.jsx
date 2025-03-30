"use client";

import { useState } from "react";
import MetricCard from "./metricCard";
import { mapMetricToAnalogy, extrapolateMetrics } from "../utils/utils";

const AggregatorDisplay = ({
  totalConversations,
  totalCO2,
  totalEnergy,
  totalWater,
}) => {
  const extrapolationText = extrapolateMetrics(
    totalCO2,
    totalWater,
    totalEnergy
  );
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="flex relative flex-col self-center pt-4 pb-3 mt-3 w-full rounded-2xl bg-white bg-opacity-90 shadow-lg max-w-[350px] border border-gray-100">
      <div className="flex gap-2 justify-center items-center self-center mb-2 text-base font-medium">
        <h2 className="self-stretch my-auto font-semibold text-gray-800">
          Overall Usage Statistics
        </h2>
        <div className="relative inline-block">
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowTooltip(!showTooltip)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
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

          {showTooltip && (
            <div className="absolute top-8 right-0 whitespace-nowrap bg-gray-800 text-white text-xs rounded-md py-1 px-2 shadow-md z-10">
              Total AI interactions tracked so far
              <div className="absolute right-4 -top-1.5 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden py-2 w-full space-y-5">
        <MetricCard
          icon="/assets/conversations.png"
          value={`${totalConversations} conversations`}
          description="Total tracked AI interactions"
          gradientBackground="bg-gradient-to-br from-gray-50 to-gray-200"
        />
        <MetricCard
          icon="/assets/co2.png"
          value={
            totalCO2 > 1000 ? `${totalCO2 / 1000} Kg CO₂` : `${totalCO2} g CO₂`
          }
          description={mapMetricToAnalogy("co2", totalCO2)}
          gradientBackground="bg-gradient-to-br from-green-50 to-green-200"
        />
        <MetricCard
          icon="/assets/water.png"
          value={`${totalWater} liters`}
          description={mapMetricToAnalogy("water", totalWater)}
          gradientBackground="bg-gradient-to-br from-blue-50 to-blue-200"
        />
        <MetricCard
          icon="/assets/energy.png"
          value={
            totalEnergy > 1000
              ? `${totalEnergy / 1000} kWh`
              : `${totalEnergy} Wh`
          }
          description={mapMetricToAnalogy("energy", totalEnergy)}
          gradientBackground="bg-gradient-to-br from-amber-50 to-amber-200"
        />
      </div>

      <div className="flex flex-col px-4 mt-2">
        <p className="px-3 py-2.5 text-xs leading-relaxed rounded-xl bg-gray-100 text-gray-700">
          {extrapolationText}
        </p>
        <button
          className="self-start mt-3 text-xs text-green-600 hover:text-green-800 font-medium transition-colors flex items-center gap-1 cursor-pointer"
          onClick={() =>
            window.open(
              "https://sustain-gdg.github.io/Documentation/",
              "_blank"
            )
          }
        >
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

export default AggregatorDisplay;
