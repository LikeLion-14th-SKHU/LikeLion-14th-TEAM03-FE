import { useEffect, useState } from "react";
import BackButton from "../components/common/BackButton";
import { getCards } from "../api/cards";
import SolutionCardList from "../components/home/SolutionCardList";

// 백엔드 연결이 안 될 때도 화면 흐름을 보여주기 위한 임시 카드입니다.
const FALLBACK_CARDS = [
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

export default function ConcernHistory() {
  const [cards, setCards] = useState(null); // null = 로딩 중
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // GET /api/cards → { cards: [...] }
        const real = await getCards();
        if (!cancelled) setCards(real);
      } catch {
        if (!cancelled) {
          setLoadFailed(true);
          setCards(FALLBACK_CARDS);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#E7E7E8] -mx-4 -my-6 px-5 py-6 flex flex-1 flex-col gap-3">
      <BackButton />
      <h2 className="text-[18px] font-bold text-[#1f1f1f]">지난 고민 솔루션</h2>

      {cards === null ? (
        <p className="text-center text-[13px] text-[#9a958c] py-10">불러오는 중...</p>
      ) : (
        <>
          {loadFailed && (
            <p className="text-center text-[11px] text-[#9a958c]">
              서버에 연결하지 못해 임시 데이터를 보여주고 있어요.
            </p>
          )}
          <SolutionCardList cards={cards} />
        </>
      )}
    </section>
  );
}
