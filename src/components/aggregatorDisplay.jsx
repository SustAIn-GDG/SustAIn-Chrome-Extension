import { useState, useEffect } from "react";
import {
  aggregateAllMetrics,
  mapMetricToAnalogy,
  getEnvironmentalContext,
} from "../utils/utils";
import MetricCard from "./metricCard";

const AggregateMetricsButton = ({ onToggleView }) => {
  return (
    <button
      onClick={onToggleView}
      className="absolute right-6 top-[140px] z-20 flex items-center gap-1 bg-teal-500 hover:bg-teal-600 text-white py-1 px-2.5 rounded-full text-xs font-medium shadow-md transition-all duration-200 hover:scale-105"
      aria-label="View all metrics"
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
        <path d="M3 3v18h18"></path>
        <path d="M18 17V9"></path>
        <path d="M13 17V5"></path>
        <path d="M8 17v-3"></path>
      </svg>
      All Usage
    </button>
  );
};

const AggregateMetricsDisplay = ({ onClose }) => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAggregateMetrics = async () => {
      try {
        const data = await aggregateAllMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching aggregate metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAggregateMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col animate-in slide-in-from-right duration-300 self-center pt-4 pb-3 mt-3 w-full rounded-2xl bg-white bg-opacity-90 shadow-lg max-w-[320px] border border-gray-100 items-center justify-center h-72">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-gray-600">Loading all metrics...</p>
      </div>
    );
  }

  // Total number of conversations
  const getTotalConversations = () => {
    try {
      const localData = localStorage.getItem("sustAIn_conversations");
      const localConversations = localData ? JSON.parse(localData) : {};
      return Object.keys(localConversations).length;
    } catch (error) {
      console.error("Error getting total conversations:", error);
      return 0;
    }
  };

  const totalConversations = getTotalConversations();

  return (
    <section className="flex flex-col animate-in slide-in-from-right duration-300 self-center pt-4 pb-3 mt-3 w-full rounded-2xl bg-white bg-opacity-90 shadow-lg max-w-[320px] border border-gray-100 relative">
      <div className="flex gap-2 justify-center items-center self-center mb-2 text-base font-medium px-4">
        <div
          className="flex shrink-0 self-stretch my-auto h-[32px] w-[32px] rounded-full bg-teal-500 items-center justify-center text-white"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
          </svg>
        </div>
        <h2 className="self-stretch my-auto font-semibold text-gray-800">
          Your Total AI Usage
        </h2>
      </div>

      <p className="text-xs text-center text-gray-600 mb-2">
        Data from {totalConversations} conversation
        {totalConversations !== 1 ? "s" : ""}
      </p>

      <div className="overflow-hidden py-2 w-full space-y-5">
        <MetricCard
          icon="/assets/co2.png"
          value={
            metrics.CarbonEmission > 1000
              ? `${(metrics.CarbonEmission / 1000).toFixed(1)} Kg CO₂`
              : `${metrics.CarbonEmission.toFixed(1)} g CO₂`
          }
          description={mapMetricToAnalogy("co2", metrics.CarbonEmission)}
          gradientBackground="bg-gradient-to-br from-green-50 to-green-200"
        />
        <MetricCard
          icon="/assets/water.png"
          value={`${metrics.WaterConsumption.toFixed(1)} liters`}
          description={mapMetricToAnalogy("water", metrics.WaterConsumption)}
          gradientBackground="bg-gradient-to-br from-blue-50 to-blue-200"
        />
        <MetricCard
          icon="/assets/energy.png"
          value={
            metrics.EnergyConsumption > 1000
              ? `${(metrics.EnergyConsumption / 1000).toFixed(1)} kWh`
              : `${metrics.EnergyConsumption.toFixed(1)} Wh`
          }
          description={mapMetricToAnalogy("energy", metrics.EnergyConsumption)}
          gradientBackground="bg-gradient-to-br from-amber-50 to-amber-200"
        />
      </div>

      <div className="flex flex-col px-4 mt-3">
        <div className="px-3 py-2 text-xs rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 text-slate-700 border border-blue-100">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="text-green-500 flex-shrink-0"
            >
              <path
                fill="currentColor"
                d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
              />
            </svg>
            <span className="font-medium">Echoes of Usage</span>
          </div>
          <p className="mt-1 text-blue-700 italic">
            {getEnvironmentalContext(metrics.CarbonEmission)}
          </p>
        </div>

        <button
          className="self-center mt-3 px-3 py-1.5 text-xs text-white bg-teal-500 hover:bg-teal-600 rounded-full shadow-sm transition-colors flex items-center gap-1"
          onClick={onClose}
        >
          Return to Current Conversation
        </button>
      </div>
    </section>
  );
};

export { AggregateMetricsButton, AggregateMetricsDisplay };
