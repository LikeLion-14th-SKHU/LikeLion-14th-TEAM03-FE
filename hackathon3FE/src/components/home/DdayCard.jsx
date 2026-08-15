export default function DdayCard({ purpose, dday }) {
  const isCounting = typeof dday === "number" && dday > 0;
  const text =
    dday === 0
      ? "오늘이에요! 최선을 다해요"
      : dday < 0
      ? "플랜이 종료됐어요"
      : `D-${dday}`;

  return (
    <div className="flex-[1.35] bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between overflow-hidden">
      <div className="text-[15px] font-bold text-[#1f1f1f]">{purpose} 까지</div>
      <div
        className={
          "mt-1.5 font-extrabold text-[#285E3C] tracking-tight -ml-1 whitespace-nowrap " +
          (isCounting ? "text-[54px] leading-none" : "text-[16px] leading-snug")
        }
      >
        {text}
      </div>
    </div>
  );
}
