import LoadingBar from "../LoadingBar";

// 실제 리포트 응답(result)이 오기 전까지는 여기까지만 차오르게 해서
// "다 끝난 것처럼 보이는데 안 넘어가는" 느낌이 안 들게 합니다.
// 응답이 도착하면(isReady) 100%까지 마저 채우고 나서 결과 화면으로 넘어가요.
const WAITING_VALUE = 85;
const WAITING_DURATION = 1400;
const FINISH_DURATION = 400;

export default function LoadingStep({ isReady = false }) {
  const value = isReady ? 100 : WAITING_VALUE;
  const duration = isReady ? FINISH_DURATION : WAITING_DURATION;

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-[280px]">
        <div className="mb-4 text-center text-[14px] font-semibold text-[#6f6c62]">
          결산 리포트를 만들고 있어요
        </div>
        <LoadingBar value={value} duration={duration} />
      </div>
    </div>
  );
}
