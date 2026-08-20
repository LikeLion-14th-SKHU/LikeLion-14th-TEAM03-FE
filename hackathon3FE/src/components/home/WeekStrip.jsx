// 카드 형태의 감싸는 틀 없이 날짜 원(circle)들만 그립니다. 카드 틀/헤더는
// 홈에서는 AnalysisProgressCard가, D-Day 종료 화면 배경에서는 DDayEnd.jsx가
// 각자 감싸줍니다.
export default function WeekStrip({ days }) {
  return (
    <div className="flex justify-between">
      {days.map((day) => {
        const checked = day.isChecked;
        const state = day.isBeforeStart
          ? "beforeStart"
          : checked
          ? "done"
          : day.isToday
          ? "today"
          : day.isPast
          ? "missed"
          : "upcoming";

        const circleClass = {
          done: "bg-[#285E3C] text-white",
          today: "border-2 border-[#285E3C] bg-white text-[#1f1f1f]",
          missed: "bg-[#D9D9D9] text-[#1f1f1f]",
          upcoming: "bg-transparent text-[#1f1f1f]",
          beforeStart: "bg-transparent text-[#c9c6c0]",
        }[state];

        const labelClass =
          state === "done" || state === "today"
            ? "text-[#285E3C]"
            : "text-[#9a958c]";

        const stateLabel = {
          done: "완료",
          today: "오늘",
          missed: "미완료",
          upcoming: "예정",
          beforeStart: "",
        }[state];

        return (
          <div
            key={day.date}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <div
              className={
                "flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold " +
                circleClass
              }
            >
              {day.day}
            </div>
            <span className={"text-[11px] font-semibold " + labelClass}>
              {stateLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
