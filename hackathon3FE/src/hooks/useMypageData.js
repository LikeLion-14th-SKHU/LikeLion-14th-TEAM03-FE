import { useEffect, useState } from "react";
import { getOnboarding } from "../api/onboarding";
import { getProgress } from "../api/todo";
import { toggleNotifications } from "../api/notifications";

// ⚠️ 임시: 닉네임/피부타입/D-Day/투두 달성률은 실제 API 연동을 시도하고,
// 실패하면(세션/온보딩 없음, CORS 등) 목데이터로 화면을 채웁니다.
// 피부 히스토리 목록과 D-Day 날짜 수정, 히스토리 추가, 세안/스킨케어 알림
// 개별 설정은 아직 대응하는 백엔드 엔드포인트가 없어서 로컬 상태로만
// 동작하며, 알림 토글은 기존 공용 PATCH /api/notifications/toggle을
// best-effort로 호출합니다.

const MOCK_PROFILE = { name: "OO", baseType: "OILY", goalDate: "2026-09-04" };

const MOCK_HISTORY = [
  { id: 1, range: "2026.08.10 ~ 2026.08.29", goal: "소개팅", totalDays: 19 },
  { id: 2, range: "2026.09.04 ~ 2026.10.04", goal: "강릉 여행", totalDays: 30 },
];

const MOCK_PROGRESS = { cleansingRate: 0.82, skincareRate: 0.74 };

export function useMypageData() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [progress, setProgress] = useState(MOCK_PROGRESS);
  const [cleansingNotiEnabled, setCleansingNotiEnabled] = useState(true);
  const [skincareNotiEnabled, setSkincareNotiEnabled] = useState(true);
  const [cleansingNotiPending, setCleansingNotiPending] = useState(false);
  const [skincareNotiPending, setSkincareNotiPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // GET /api/onboarding → { name, baseType, goalDate, notiEnabled, ... }
        const real = await getOnboarding();
        if (!cancelled && real) {
          setProfile({ name: real.name, baseType: real.baseType, goalDate: real.goalDate });
          if (typeof real.notiEnabled === "boolean") {
            setCleansingNotiEnabled(real.notiEnabled);
            setSkincareNotiEnabled(real.notiEnabled);
          }
        }
      } catch {
        // 세션/온보딩이 없으면 목데이터를 유지합니다.
      }
    })();

    (async () => {
      try {
        // GET /api/todo/progress → { cleansingRate, skincareRate, ... }
        const real = await getProgress();
        if (!cancelled && real) setProgress(real);
      } catch {
        // 실패해도 목데이터를 유지합니다.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleCleansingNoti() {
    setCleansingNotiEnabled((prev) => !prev);
    setCleansingNotiPending(true);
    try {
      // PATCH /api/notifications/toggle (세안/스킨케어 구분 엔드포인트가 아직 없어 공용 API를 best-effort로 호출)
      await toggleNotifications();
    } catch {
      // 실패해도 화면상 토글 상태는 그대로 둡니다.
    } finally {
      setCleansingNotiPending(false);
    }
  }

  async function toggleSkincareNoti() {
    setSkincareNotiEnabled((prev) => !prev);
    setSkincareNotiPending(true);
    try {
      await toggleNotifications();
    } catch {
    } finally {
      setSkincareNotiPending(false);
    }
  }

  function updateGoalDate(newDate) {
    // ⚠️ 임시: D-Day 날짜 수정 API가 아직 없어서 로컬 상태만 업데이트합니다.
    setProfile((prev) => ({ ...prev, goalDate: newDate }));
  }

  function addHistoryPlaceholder() {
    // ⚠️ 임시: 히스토리 추가 플로우/API가 아직 없어서 자리만 마련해둡니다.
  }

  return {
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
  };
}
