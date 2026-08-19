import { formatHeaderDate } from "../../utils/date";
import WeekStrip from "./WeekStrip";

// "분석 진행 현황" 카드: 왼쪽엔 제목, 오른쪽엔 오늘 날짜와 며칠째인지(N일차),
// 그 아래에 한 주간의 체크 현황(WeekStrip)을 보여줍니다.
export default function AnalysisProgressCard({ days, dayCount }) {
  const today = days.find((d) => d.isToday);

  return (
    <section className="bg-white rounded-2xl shadow-sm px-4 pt-3 pb-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-bold text-[#1f1f1f]">
          분석 진행 현황
        </span>
        <span className="text-[12px] font-medium text-[#9a958c]">
          {today ? formatHeaderDate(new Date(today.date)) : ""}
          {typeof dayCount === "number" ? ` (${dayCount}일차)` : ""}
        </span>
      </div>

      <div className="mt-3">
        <WeekStrip days={days} />
      </div>
    </section>
  );
}
