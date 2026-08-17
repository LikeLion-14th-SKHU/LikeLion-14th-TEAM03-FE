import { useEffect, useState } from "react";
import { saveTodoCheck } from "../api/todo";
import { getCards } from "../api/cards";
import { getOnboarding } from "../api/onboarding";
import { errorMessage } from "../api/client";
import { isoDate } from "../utils/date";

// ⚠️ 백엔드에 "오늘 체크했는지" 를 조회하는 API가 없어서(GET /api/todo/progress는
// 누적 통계만 줌), 새로고침/페이지 이동 후에도 오늘 체크 상태가 유지되도록
// 같은 브라우저에 한해 임시로 저장해둡니다. 날짜가 바뀌면 자동으로 초기화됩니다.
const TODAY_CHECKS_STORAGE_KEY = "oddeune:todayChecks";

function loadTodayChecks() {
  try {
    const raw = window.localStorage.getItem(TODAY_CHECKS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.date !== isoDate(new Date())) return null;
    return {
      cleansingDone: !!parsed.cleansingDone,
      skincareDone: !!parsed.skincareDone,
    };
  } catch {
    return null;
  }
}

function saveTodayChecksLocal(checks) {
  try {
    window.localStorage.setItem(
      TODAY_CHECKS_STORAGE_KEY,
      JSON.stringify({ date: isoDate(new Date()), ...checks }),
    );
  } catch {
    // localStorage를 쓸 수 없는 환경이면 조용히 무시합니다.
  }
}

// 온보딩(이름/목적/D-Day/피부타입)은 실제 GET /api/onboarding을 먼저 시도하고,
// 세션/온보딩이 없거나 요청이 실패하면 목데이터로 화면이 계속 정상 동작하도록
// 낙관적 패턴을 그대로 따릅니다(카드 목록 로드와 동일한 방식).
const MOCK_ONBOARDING = {
  onboardingId: 1,
  name: "OO",
  purpose: "오사카 여행",
  goalDate: "2026-09-04",
  age: 26,
  gender: "FEMALE",
  baseType: "OILY",
  flags: { dehydrated: true, sensitive: false, acne: true, markProne: true },
  safety: { onMedication: false, retinolHistory: "never", inflammatory: false },
  notiEnabled: true,
  createdAt: "2026-08-01T00:00:00",
  dday: 23,
};

const INITIAL_CARDS = [
  {
    cardId: 1,
    cardType: "INITIAL",
    cardSummary: "턱 여드름 + 피지 과다",
    ddayAtTime: 30,
    status: null,
    prescribedIngredients: ["나이아신아마이드"],
    excludedIngredients: ["살리실산"],
    createdAt: "2026-07-20T09:00:00",
  },
];

export function useHomeData() {
  const [onboarding, setOnboarding] = useState(MOCK_ONBOARDING);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [todayChecks, setTodayChecks] = useState(
    () => loadTodayChecks() || { cleansingDone: false, skincareDone: false },
  );
  const [concernPending, setConcernPending] = useState(false);
  const [todoSaveError, setTodoSaveError] = useState(null);

  const dday = onboarding.dday ?? onboarding.dDay;

  // 마운트 시 실제 온보딩 정보를 한 번 조회해봅니다. 성공하면 목데이터 대신
  // 실제 데이터(이름/목적/D-Day/피부타입)를 씁니다 (실패하면 목데이터 유지).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const real = await getOnboarding();
        if (!cancelled && real) {
          setOnboarding(real);
        }
      } catch {
        // 세션/온보딩이 없거나 네트워크 문제면 조용히 목데이터를 유지합니다.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 마운트 시 실제 카드 목록을 한 번 조회해봅니다. 성공하고 데이터가 있으면
  // 목데이터 대신 실제 데이터를 씁니다 (실패하거나 빈 목록이면 목데이터 유지).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const real = await getCards();
        if (!cancelled && real?.length > 0) {
          setCards(real);
        }
      } catch {
        // 세션/온보딩이 없거나 네트워크 문제면 조용히 목데이터를 유지합니다.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleTodo(id) {
    const key = id === "cleansing" ? "cleansingDone" : "skincareDone";
    const next = { ...todayChecks, [key]: !todayChecks[key] };

    // 낙관적 업데이트: 화면은 즉시 반영하고, 실제 저장은 백그라운드에서 시도합니다.
    setTodayChecks(next);
    saveTodayChecksLocal(next);
    setTodoSaveError(null);

    try {
      await saveTodoCheck(next);
    } catch (err) {
      // 세션/온보딩이 없거나 CORS 문제로 저장이 실패해도 로컬 화면은 그대로 둡니다.
      setTodoSaveError(errorMessage(err));
    }
  }

  async function submitConcern(text) {
    setConcernPending(true);
    const newCard = {
      cardId: cards.length + 1,
      cardType: "UPDATE",
      cardSummary: text.slice(0, 20),
      ddayAtTime: dday,
      status: "REDUCE",
      prescribedIngredients: ["히알루론산"],
      excludedIngredients: ["살리실산"],
      createdAt: "2026-08-15T09:00:00",
    };
    setCards((prev) => [newCard, ...prev]);
    setConcernPending(false);
  }

  return {
    loading: false,
    error: null,
    onboarding,
    dday,
    cards,
    todayChecks,
    toggleTodo,
    submitConcern,
    concernPending,
    concernError: null,
    todoSaveError,
  };
}
