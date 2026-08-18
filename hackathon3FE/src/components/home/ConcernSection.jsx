import { Link } from "react-router-dom";
import SolutionCard from "./SolutionCard";

// 메인 화면에는 가장 최근 솔루션 카드 1개만 미리보기로 보여주고,
// 실제 고민 입력과 전체 히스토리는 각각 별도 페이지에서 처리합니다.
export default function ConcernSection({ cards }) {
  const latestCard = cards?.[0];

  return (
    <section className="pt-2.5 pb-2.5 border-t border-[#00000014]">
      {latestCard ? (
        <div className="mb-4">
          <SolutionCard card={latestCard} />
        </div>
      ) : (
        <div className="mb-4 text-center text-[13px] text-[#9a958c]">
          아직 받은 솔루션 카드가 없어요.
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Link
          to="/concern-input"
          className="block bg-[#1f1f1f] text-white text-center rounded-lg py-4 text-[15px] font-bold"
        >
          고민 입력하기
        </Link>
        <Link
          to="/concern-history"
          className="block bg-white shadow-sm text-center rounded-lg py-4 text-[15px] font-bold text-[#1f1f1f]"
        >
          지난 고민 솔루션 보기
        </Link>
      </div>
    </section>
  );
}
