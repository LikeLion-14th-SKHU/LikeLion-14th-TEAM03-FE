import { useEffect, useState } from "react";
import { getMypage, getMypageHistory } from "../api/mypage";
import { getOnboarding, updateGoalDate as updateGoalDateApi } from "../api/onboarding";
import { toggleNotifications } from "../api/notifications";

// ⚠️ 닉네임/피부타입/목표 이름/D-Day 날짜/투두 달성률은 GET /api/mypage로 연동합니다.
// 실패하면(세션/온보딩 없음, CORS 등) 목데이터로 화면을 채웁니다.
// 알림 on/off는 백엔드에 세안/스킨케어 개별 토글이 없어(공용 PATCH /api/notifications/toggle
// 하나뿐) 화면에서도 알림 설정을 하나로 합쳐서 보여줍니다(초기값은 GET /api/onboarding의 notiEnabled).
// 피부 히스토리: GET /api/mypage/history로 진행중 + 종료된 플랜 전체를 최신순으로 받아옵니다.

const MOCK_PROFILE = { name: "OO", baseType: "OILY", goalDate: "2026-09-04" };

const MOCK_PROGRESS = { cleansingRate: 0.82, skincareRate: 0.74 };

export function useMypageData() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [history, setHistory] = useState([]);
  const [progress, setProgress] = useState(MOCK_PROGRESS);
  const [notiEnabled, setNotiEnabled] = useState(true);
  const [notiPending, setNotiPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // GET /api/mypage → { myInfo, skinResult, todoStats, planResult }
        const real = await getMypage();
        if (cancelled || !real) return;

        if (real.myInfo) {
          setProfile({
            name: real.myInfo.name,
            baseType: real.myInfo.baseType,
            goalDate: real.myInfo.goalDate,
          });
        }

        if (real.todoStats) {
          const { cleansingRate, skincareRate } = real.todoStats;
          // 백엔드는 0~100 사이의 정수(퍼센트)로 내려주므로 기존 화면 로직(0~1 비율)에 맞춰 변환합니다.
          setProgress({
            cleansingRate: (cleansingRate || 0) / 100,
            skincareRate: (skincareRate || 0) / 100,
          });
        }

      } catch {
        // 세션/온보딩이 없으면(예: ONBOARDING_NOT_FOUND) 목데이터를 유지합니다.
      }
    })();

    (async () => {
      try {
        // GET /api/mypage/history → 진행중 + 종료된 플랜 전체(최신순)
        const real = await getMypageHistory();
        if (!cancelled && Array.isArray(real)) {
          setHistory(
            real.map((item) => ({
              id: item.onboardingId,
              completed: !item.isActive,
              ...item,
            })),
          );
        }
      } catch {
        // 세션/온보딩이 없으면 빈 히스토리를 유지합니다.
      }
    })();

    (async () => {
      try {
        // GET /api/onboarding → notiEnabled(알림 on/off 초기값)만 참고합니다.
        const real = await getOnboarding();
        if (!cancelled && real && typeof real.notiEnabled === "boolean") {
          setNotiEnabled(real.notiEnabled);
        }
      } catch {
        // 실패해도 기본값(true)을 유지합니다.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleNoti() {
    const next = !notiEnabled;
    setNotiEnabled(next);
    setNotiPending(true);
    try {
      // PATCH /api/notifications/toggle → { notiEnabled, message }
      const real = await toggleNotifications();
      if (typeof real?.notiEnabled === "boolean") {
        setNotiEnabled(real.notiEnabled);
      }
    } catch {
      // 실패하면 낙관적으로 바꾼 상태를 되돌립니다.
      setNotiEnabled(!next);
    } finally {
      setNotiPending(false);
    }
  }

  async function updateGoalDate(newDate) {
    const prevDate = profile.goalDate;
    setProfile((prev) => ({ ...prev, goalDate: newDate }));
    try {
      // PATCH /api/onboarding/goal-date  body: { goalDate }
      await updateGoalDateApi(newDate);
    } catch {
      // 실패하면(예: INVALID_GOAL_DATE) 이전 날짜로 되돌립니다.
      setProfile((prev) => ({ ...prev, goalDate: prevDate }));
    }
  }

  function addHistoryPlaceholder() {
    // ⚠️ 임시: 히스토리 추가 플로우/API가 아직 없어서 자리만 마련해둡니다.
  }

  return {
    profile,
    history,
    progress,
    notiEnabled,
    notiPending,
    toggleNoti,
    updateGoalDate,
    addHistoryPlaceholder,
  };
}
