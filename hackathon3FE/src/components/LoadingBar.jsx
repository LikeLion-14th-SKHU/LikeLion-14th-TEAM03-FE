import { useEffect, useState } from "react";

export default function LoadingBar({
  value = 89,
  min = 0,
  max = 100,
  height = 6,
  duration = 1200,
  className = "",
}) {
  const safeValue = Math.min(Math.max(value, min), max);
  const percent = Math.round((safeValue / (max - min)) * 100);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(((safeValue * eased) / (max - min)) * 100);
      setDisplayValue(nextValue);

      if (progress < 1) {
        start = requestAnimationFrame(tick);
      }
    };

    start = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(start);
  }, [safeValue, min, max, duration]);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative overflow-hidden rounded-full bg-[#D9D9D9]"
        style={{ height: `${height}px` }}
      >
        <div
          className="h-full rounded-full bg-[#285E3C] transition-[width] duration-700 ease-out"
          style={{ width: `${Math.min(displayValue, 100)}%` }}
        />
      </div>

      <div className="mt-3 text-center text-[14px] font-medium text-[#6C6C6C]">
        {Math.min(displayValue, 100)}%
      </div>
    </div>
  );
}
