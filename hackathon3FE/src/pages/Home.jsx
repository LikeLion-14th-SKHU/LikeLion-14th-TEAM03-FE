import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeData } from "../hooks/useHomeData";
import { buildWeekStrip, daysBetween } from "../utils/date";
import AnalysisProgressCard from "../components/home/AnalysisProgressCard";
import DdayCard from "../components/home/DdayCard";
import TodoChecklist from "../components/home/TodoChecklist";
import TodayCompleteBanner from "../components/home/TodayCompleteBanner";
import ConcernSection from "../components/home/ConcernSection";

export default function Home() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    onboarding,
    dday,
    cards,
    todayChecks,
    checkHistory,
    toggleTodo,
  } = useHomeData();

  // D-Day가 끝나면(0 이하) 자동으로 D-Day 종료 플로우로 이동시킵니다.
  useEffect(() => {
    if (typeof dday === "number" && dday <= 0) {
      navigate("/d-dayend");
    }
  }, [dday, navigate]);

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

  const weekStrip = buildWeekStrip(new Date(), checkHistory);
  const totalPlanDays = daysBetween(onboarding.createdAt, onboarding.goalDate);
  const dayCount = daysBetween(onboarding.createdAt, new Date()) + 1;
  const isTodayCompleted = todayChecks.cleansingDone && todayChecks.skincareDone;

  return (
    <section className="bg-[#E7E7E8] px-5 pt-4 pb-4 flex flex-1 flex-col gap-4">
      <AnalysisProgressCard days={weekStrip} dayCount={dayCount} />

      <DdayCard
        purpose={onboarding.purpose}
        dday={dday}
        totalDays={totalPlanDays}
      />

      <div>
        <div className="mb-2 text-[15px] font-bold text-[#1f1f1f]">
          오늘의 체크
        </div>
        <TodoChecklist todayChecks={todayChecks} onToggle={toggleTodo} />
      </div>

      {isTodayCompleted && <TodayCompleteBanner />}

      <ConcernSection cards={cards} />
    </section>
  );
}
