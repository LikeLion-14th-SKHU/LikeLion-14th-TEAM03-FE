import { useMypageData } from "../hooks/useMypageData";
import ProfileCard from "../components/mypage/ProfileCard";
import SkinHistorySection from "../components/mypage/SkinHistorySection";
import NotificationToggle from "../components/mypage/NotificationToggle";
import TodoProgressCard from "../components/mypage/TodoProgressCard";

export default function Mypage() {
  const {
    profile,
    history,
    progress,
    cleansingNotiEnabled,
    skincareNotiEnabled,
    cleansingNotiPending,
    skincareNotiPending,
    toggleCleansingNoti,
    toggleSkincareNoti,
    updateGoalDate,
    addHistoryPlaceholder,
  } = useMypageData();

  return (
    <section className="bg-white -mx-4 -my-6 px-5 py-6 flex flex-col gap-3">
      <h2 className="text-[18px] font-bold text-[#285E3C]">마이페이지</h2>

      <ProfileCard
        name={profile.name}
        baseType={profile.baseType}
        goalDate={profile.goalDate}
        onGoalDateChange={updateGoalDate}
      />

      <SkinHistorySection history={history} onAdd={addHistoryPlaceholder} />

      <NotificationToggle
        cleansingEnabled={cleansingNotiEnabled}
        skincareEnabled={skincareNotiEnabled}
        onToggleCleansing={toggleCleansingNoti}
        onToggleSkincare={toggleSkincareNoti}
        cleansingPending={cleansingNotiPending}
        skincarePending={skincareNotiPending}
      />

      <TodoProgressCard progress={progress} />
    </section>
  );
}
