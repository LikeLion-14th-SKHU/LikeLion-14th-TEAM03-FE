export default function SolutionCard({ card }) {
  const {
    cardSummary,
    status,
    prescribedIngredients = [],
    excludedIngredients = [],
  } = card;

  return (
    <div className="bg-white rounded-xl shadow-sm p-3.5 text-left">
      {status && (
        <span className="text-[12px] font-semibold text-[#8a877f]">{status}</span>
      )}

      <div className="text-[13px] font-semibold text-[#9a958c]">
        현재 피부 고민
      </div>
      <div className="mt-1 text-[19px] font-bold text-[#1f1f1f] leading-snug">
        {cardSummary}
      </div>

      {prescribedIngredients.length > 0 && (
        <div className="mt-3">
          <div className="mb-1.5 text-[12px] font-semibold text-[#9a958c]">
            추천 성분
          </div>
          <div className="flex flex-wrap gap-1.5">
            {prescribedIngredients.map((name) => (
              <span
                key={`p-${name}`}
                className="text-[12px] font-semibold text-[#285E3C] bg-[#EDF3EE] rounded-full px-3 py-1"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {excludedIngredients.length > 0 && (
        <div className="mt-2.5">
          <div className="mb-1.5 text-[12px] font-semibold text-[#9a958c]">
            주의 성분
          </div>
          <div className="flex flex-wrap gap-1.5">
            {excludedIngredients.map((name) => (
              <span
                key={`e-${name}`}
                className="text-[12px] font-semibold text-[#BB3A2B] bg-[#F5EBE8] rounded-full px-3 py-1"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
