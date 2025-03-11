import { useEffect, useState, useRef } from "react";

const MetricCard = ({
  icon,
  value,
  description,
  gradientBackground = "bg-gradient-to-br from-blue-100 to-blue-200",
}) => {
  const [count, setCount] = useState(0);
  const [unit, setUnit] = useState("");
  const countRef = useRef(null);
  const duration = 1500; // animation duration in ms

  useEffect(() => {
    // Parse the numeric value and unit
    const match = String(value).match(/^([\d.]+)\s*(.*)$/);
    if (match) {
      const targetValue = parseFloat(match[1]);
      setUnit(match[2]);

      // Start the animation
      const startTime = Date.now();
      const startValue = 0;

      const updateCount = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smoother animation
        const easeOutQuad = (t) => t * (2 - t);
        const currentValue =
          startValue + easeOutQuad(progress) * (targetValue - startValue);

        setCount(currentValue);

        if (progress < 1) {
          countRef.current = requestAnimationFrame(updateCount);
        }
      };

      countRef.current = requestAnimationFrame(updateCount);
    }

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [value]);

  return (
    <article
      className="flex gap-3 items-center px-4 w-full transition-all duration-200 hover:translate-x-1"
      tabIndex={0}
      aria-label={`${value} - ${description}`}
    >
      <div
        className={`rounded-2xl ${gradientBackground} p-3.5 shadow-md`}
        aria-hidden="true"
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt=""
            className="object-contain shrink-0 my-auto w-14 h-14 rounded-none"
            aria-hidden="true"
          />
        ) : (
          <div className="shrink-0 my-auto w-14 h-14 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="self-stretch pt-2 pb-1 my-auto min-h-[64px] w-[170px]">
        <h3 className="text-lg font-bold tracking-tight">
          {count.toFixed(1)} {unit}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-gray-800">
          {description}
        </p>
      </div>
    </article>
  );
};

export default MetricCard;
