export default function DdayCard({ purpose, dday }) {
  const isCounting = typeof dday === "number" && dday >= 0;
  const text =
    dday === 0
      ? "D-Day"
      : dday < 0
      ? "플랜이 종료됐어요"
      : `D-${dday}`;

  return (
    <div className="w-full rounded-2xl bg-[#285E3C] px-5 pt-3.5 pb-5 text-white">
      <div className="text-[14px] font-semibold text-white/85">
        {purpose} 까지
      </div>

      <div className="mt-1.5 text-center text-[64px] font-black leading-none tracking-tight">
        {text}
      </div>

      {isCounting && dday > 0 && (
        <div className="mt-2 text-center text-[13px] font-medium text-white/80">
          📅 {dday}일 후, {purpose} 목표를 달성해요!
        </div>
      )}
    </div>
  );
}
