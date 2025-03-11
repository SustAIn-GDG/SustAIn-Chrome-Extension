"use client";

import { useState, useEffect } from "react";

const AnimatedLoader = () => {
  const loadingMessages = [
    "Calculating your environmental impact...",
    "Measuring CO₂ emissions...",
    "Analyzing water usage...",
    "Computing energy consumption...",
    "Preparing your sustainability metrics...",
    "Almost done gathering your data...",
    "Generating insights for you...",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Change message every 5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length
      );
    }, 2500);

    // Clean up interval on unmount
    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full rounded-2xl bg-white bg-opacity-90 shadow-lg max-w-[320px] border border-gray-100">
      <div className="w-32 h-32 flex items-center justify-center relative">
        {/* Eco-themed animated loader */}
        <div className="absolute">
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Outer rotating ring */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e0f2f1"
              strokeWidth="6"
              strokeDasharray="339.292"
              strokeDashoffset="0"
            />

            {/* Inner pulsing circle */}
            <circle
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke="#4db6ac"
              strokeWidth="4"
              strokeDasharray="263.894"
              strokeDashoffset="0"
              className="animate-pulse"
            />

            {/* Animated arc that rotates */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#009688"
              strokeWidth="6"
              strokeDasharray="339.292"
              strokeDashoffset="169.646"
              className="origin-center animate-spin"
              style={{ animationDuration: "3s" }}
            />

            {/* Leaf symbol in the middle */}
            <path
              d="M60,36 C72,36 84,48 84,60 C84,72 72,84 60,84 C48,84 39,75 42,63 C45,51 54,49.5 60,48 C70.5,46.5 73.5,52.5 72,60 C70.5,67.5 66,72 60,72"
              fill="none"
              stroke="#00796b"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: "2s" }}
            />

            {/* Small dots around the circle representing data points */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (angle, i) => {
                const x = 60 + 54 * Math.cos((angle * Math.PI) / 180);
                const y = 60 + 54 * Math.sin((angle * Math.PI) / 180);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={
                      i % 3 === 0
                        ? "#4db6ac"
                        : i % 3 === 1
                        ? "#80cbc4"
                        : "#b2dfdb"
                    }
                    className={`animate-pulse opacity-${70 + (i % 3) * 10}`}
                    style={{
                      animationDelay: `${i * 0.25}s`,
                      animationDuration: "1.5s",
                    }}
                  />
                );
              }
            )}
          </svg>
        </div>
      </div>

      <div className="mt-4 text-center px-4">
        <p className="text-gray-700 font-medium">
          {loadingMessages[currentMessageIndex]}
        </p>
      </div>
    </div>
  );
};

export default AnimatedLoader;
