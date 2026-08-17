import { useEffect } from "react";
import LoadingBar from "../LoadingBar";

const DURATION = 1400;

export default function LoadingStep({ value = 89, onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone?.();
    }, DURATION + 300);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-[280px]">
        <div className="mb-4 text-center text-[14px] font-semibold text-[#6f6c62]">
          결산 리포트를 만들고 있어요
        </div>
        <LoadingBar value={value} duration={DURATION} />
      </div>
    </div>
  );
}
