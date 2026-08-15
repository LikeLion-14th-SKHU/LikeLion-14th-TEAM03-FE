import { formatHeaderDate } from "../../utils/date";

export default function WeekStrip({ days }) {
  const today = days.find((d) => d.isToday);

  return (
    <section className="bg-white rounded-2xl shadow-sm px-4 pt-2.5 pb-2.5">
      <div className="w-fit mx-auto mb-2.5 px-4 py-1 rounded-full border border-[#E2D9D0] text-[13px] font-semibold text-[#1f1f1f]">
        {today ? formatHeaderDate(new Date(today.date)) : ""}
      </div>
      <div className="flex justify-between">
        {days.map((day) => (
          <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={
                "w-8 h-9 rounded-full flex items-center justify-center text-[13px] font-bold " +
                (day.isPast
                  ? "bg-[#285E3C] text-white"
                  : day.isToday
                  ? "bg-[#D9D9D9] text-[#1f1f1f]"
                  : "text-[#1f1f1f]")
              }
            >
              {day.day}
            </div>
            <div className="text-[12px] font-semibold text-[#9a958c]">
              {day.weekdayLabel}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
