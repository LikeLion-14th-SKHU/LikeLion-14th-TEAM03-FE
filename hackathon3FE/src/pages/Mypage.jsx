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
    notiEnabled,
    notiPending,
    toggleNoti,
    updateGoalDate,
    addHistoryPlaceholder,
  } = useMypageData();

  return (
    <section className="bg-white px-5 py-6 flex flex-col gap-3">
      <h2 className="text-[20px] text-[#285E3C]">마이페이지</h2>

      <ProfileCard
        name={profile.name}
        baseType={profile.baseType}
        goalDate={profile.goalDate}
        onGoalDateChange={updateGoalDate}
      />

      <SkinHistorySection history={history} onAdd={addHistoryPlaceholder} />

      <NotificationToggle
        enabled={notiEnabled}
        onToggle={toggleNoti}
        pending={notiPending}
      />

      <TodoProgressCard progress={progress} />
    </section>
  );
}
