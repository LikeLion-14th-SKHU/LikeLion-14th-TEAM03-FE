import { useEffect, useState } from "react";
import LoadingBar from "./LoadingBar";

export default function CompletionLoading({ onComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressTimer = window.setTimeout(() => setLoadingProgress(100), 100);
    const completeTimer = window.setTimeout(onComplete, 2300);

    return () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex h-full w-full animate-[profileIn_400ms_ease-out_both] flex-col items-center justify-center bg-white px-6">
      <p className="mb-8 text-center text-[18px] font-medium text-[#2a2a2a]">
        정보를 저장하고 있어요.
      </p>
      <div className="w-full max-w-[240px]">
        <LoadingBar
          value={loadingProgress}
          duration={1800}
          height={4}
          showPercent
          className="w-full"
        />
      </div>
    </div>
  );
}
