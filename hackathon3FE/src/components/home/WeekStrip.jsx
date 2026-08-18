import { formatHeaderDate } from "../../utils/date";

export default function WeekStrip({ days }) {
  const today = days.find((d) => d.isToday);

  return (
    <section className="bg-white rounded-2xl shadow-sm px-4 pt-2.5 pb-2.5">
      <div className="w-fit mx-auto mb-2.5 px-4 py-1 rounded-full border border-[#E2D9D0] text-[13px] font-semibold text-[#1f1f1f]">
        {today ? formatHeaderDate(new Date(today.date)) : ""}
      </div>
      <div className="flex justify-between">
        {days.map((day) => {
          const checked = day.isChecked;
          const isUpcoming = !day.isPast && !day.isToday;
          return (
            <div key={day.date} className="flex flex-1 flex-col items-center">
              <div
                className={
                  "flex w-9 flex-col items-center justify-center gap-1.5 rounded-full py-2.5 " +
                  (checked
                    ? "bg-[#285E3C] text-white"
                    : isUpcoming
                    ? "bg-white text-[#1f1f1f]"
                    : "bg-[#D9D9D9] text-[#1f1f1f]")
                }
              >
                <span className="text-[15px] font-bold leading-none">
                  {day.day}
                </span>
                <span
                  className={
                    "text-[12px] font-semibold leading-none " +
                    (checked ? "" : "text-[#9a958c]")
                  }
                >
                  {day.weekdayLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
