import { useEffect, useState, useRef } from "react";
import { animateCount } from "../utils/utils";

const MetricCard = ({
  icon,
  value,
  description,
  gradientBackground = "bg-gradient-to-br from-blue-100 to-blue-200",
}) => {
  const [count, setCount] = useState(0);
  const [unit, setUnit] = useState("");
  const countRef = useRef(null);

  useEffect(() => {
    // Parse the numeric value and unit
    const match = String(value).match(/^([\d.]+)\s*(.*)$/);
    if (match) {
      const targetValue = parseFloat(match[1]);
      setUnit(match[2]);

      // Start the count-up animation
      animateCount(targetValue, setCount);
    }

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [value]);

  return (
    <article
      className="flex gap-3 items-center px-4 w-full transition-all duration-200 hover:translate-x-1 select-none"
      tabIndex={0}
      aria-label={`${value} - ${description}`}
    >
      <div
        className={`rounded-2xl ${gradientBackground} p-3 shadow-md`}
        aria-hidden="true"
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt=""
            className="object-contain shrink-0 my-auto w-10 h-10 rounded-none"
            aria-hidden="true"
          />
        ) : (
          <div className="shrink-0 my-auto w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="self-stretch pt-2 pb-1 my-auto min-h-[64px] w-[170px]">
        <h3 className="text-[16px] font-bold tracking-tight">
          {count.toFixed(1)} {unit}
        </h3>
        <p className="mt-1.5 text-xs leading-snug text-gray-800">
          {description}
        </p>
      </div>
    </article>
  );
};

export default MetricCard;
