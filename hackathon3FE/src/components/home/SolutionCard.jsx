export default function SolutionCard({ card }) {
  const {
    cardSummary,
    status,
    prescribedIngredients = [],
    excludedIngredients = [],
  } = card;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 text-left">
      {status && (
        <span className="text-[12px] font-semibold text-[#8a877f]">{status}</span>
      )}

      <div className="mt-2 text-[15px] font-bold text-[#1f1f1f] leading-snug">
        <span className="text-[#6f6c62] font-semibold">피부 고민 : </span>
        {cardSummary}
      </div>

      {prescribedIngredients.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] font-semibold text-[#6f6c62]">좋은 성분 :</span>
          {prescribedIngredients.map((name) => (
            <span
              key={`p-${name}`}
              className="text-[12px] font-semibold text-[#285E3C] bg-[#EDF3EE] rounded-md px-2.5 py-1"
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {excludedIngredients.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] font-semibold text-[#6f6c62]">피해야하는 성분 :</span>
          {excludedIngredients.map((name) => (
            <span
              key={`e-${name}`}
              className="text-[12px] font-semibold text-[#BB3A2B] bg-[#F5EBE8] rounded-md px-2.5 py-1 line-through decoration-1"
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
