import { useEffect, useState } from "react";
import { saveTodoCheck } from "../api/todo";
import { getCards } from "../api/cards";
import { errorMessage } from "../api/client";

// ⚠️ 임시: 온보딩(이름/D-Day/피부타입)은 여전히 목 데이터입니다 — 실제 온보딩 플로우가
// 아직 없어서, 이걸 실제 API로 걸면 세션/온보딩이 없는 사람은 화면이 아예 안 뜨게 됩니다.
//
// 아래 두 가지는 실제 백엔드 연동을 "시도"하도록 걸어뒀습니다. 실패해도
// (세션/온보딩 없음, CORS 등) 로컬 상태로 화면은 계속 정상 동작하는 낙관적 패턴이에요:
//   - toggleTodo   → POST /api/todo/check
//   - 카드 목록 초기 로드 → GET /api/cards (성공 + 1개 이상일 때만 목데이터 대체)
//
// submitConcern은 아직 실제 입력 UI(/concern-input)가 스켈레톤이라 연동 대상이 없어서
// 로컬 목데이터만 추가하는 원래 방식으로 둡니다. 실제 입력 폼을 만들 때 다시 연동하면 됩니다.

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
  dDay: 23,
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
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [todayChecks, setTodayChecks] = useState({
    cleansingDone: false,
    skincareDone: false,
  });
  const [concernPending, setConcernPending] = useState(false);
  const [todoSaveError, setTodoSaveError] = useState(null);

  const onboarding = MOCK_ONBOARDING;
  const dday = onboarding.dDay;

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
