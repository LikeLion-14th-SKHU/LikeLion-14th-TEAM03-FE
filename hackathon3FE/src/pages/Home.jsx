import { useHomeData } from "../hooks/useHomeData";
import { buildWeekStrip } from "../utils/date";
import WeekStrip from "../components/home/WeekStrip";
import DdayCard from "../components/home/DdayCard";
import TodoChecklist from "../components/home/TodoChecklist";
import SkinTypeBanner from "../components/home/SkinTypeBanner";
import ConcernSection from "../components/home/ConcernSection";

export default function Home() {
  const {
    loading,
    error,
    onboarding,
    dday,
    cards,
    todayChecks,
    toggleTodo,
  } = useHomeData();

  if (loading) {
    return <p className="text-center text-[#4a4a46] py-10">불러오는 중...</p>;
  }

  if (error || !onboarding) {
    return (
      <p className="text-center text-[#BB3A2B] py-10">
        {error || "데이터를 불러오지 못했어요."}
      </p>
    );
  }

  const weekStrip = buildWeekStrip(new Date());

  return (
    <section className="bg-[#E7E7E8] px-5 pt-4 pb-4 flex flex-1 flex-col gap-4">
      <WeekStrip days={weekStrip} />

      <div className="flex gap-2.5">
        <DdayCard purpose={onboarding.purpose} dday={dday} />
        <TodoChecklist todayChecks={todayChecks} onToggle={toggleTodo} />
      </div>

      <SkinTypeBanner nickname={onboarding.name} baseType={onboarding.baseType} />

      <ConcernSection cards={cards} />
    </section>
  );
}
