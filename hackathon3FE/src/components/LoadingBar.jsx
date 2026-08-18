import { useEffect, useState } from "react";

export default function LoadingBar({
  value = 89,
  min = 0,
  max = 100,
  height = 4,
  duration = 1200,
  className = "",
  showPercent = true,
}) {
  const safeValue = Math.min(Math.max(value, min), max);
  // 처음 뜰 때는 항상 0%부터 시작해서 목표값까지 차오르게 합니다.
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const startValue = displayValue;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(
        startValue + (safeValue - startValue) * eased,
      );
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [safeValue, duration]);

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

      {showPercent && (
        <div className="mt-3 text-center text-[14px] font-medium text-[#6C6C6C]">
          {Math.min(displayValue, 100)}%
        </div>
      )}
    </div>
  );
}
