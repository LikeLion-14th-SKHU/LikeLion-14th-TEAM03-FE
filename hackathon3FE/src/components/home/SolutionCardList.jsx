import SolutionCard from "./SolutionCard";

export default function SolutionCardList({ cards }) {
  if (!cards || cards.length === 0) {
    return (
      <div className="mb-4 text-center text-[13px] text-[#9a958c]">
        아직 받은 솔루션 카드가 없어요.
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-col gap-2">
      {cards.map((card) => (
        <SolutionCard key={card.cardId} card={card} />
      ))}
    </div>
  );
}
