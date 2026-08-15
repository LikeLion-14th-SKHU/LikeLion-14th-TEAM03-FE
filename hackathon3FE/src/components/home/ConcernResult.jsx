const STATUS_LABEL = {
  MAINTAIN: "현재 루틴 유지",
  REDUCE: "빈도 줄이기",
  PAUSE: "일시 중단",
  RECHECK: "재검사 권장",
};

export default function ConcernResult({ result, onRecheck, recheckPending }) {
  if (!result) return null;

  const showRecheck = result.status === "RECHECK" || result.medicalReferral;

  return (
    <div className="mt-4 w-full bg-[#F3F2EE] rounded-2xl p-4 text-left">
      {result.status && (
        <span className="text-[11px] font-bold text-[#285E3C] bg-[#E2D9D0] rounded-full px-2.5 py-0.5">
          {STATUS_LABEL[result.status] || result.status}
        </span>
      )}

      <div className="mt-2 text-[13.5px] font-medium text-[#1f1f1f] leading-snug">
        {result.message}
      </div>

      {result.cautions?.length > 0 && (
        <ul className="mt-2 space-y-1">
          {result.cautions.map((caution) => (
            <li key={caution} className="text-[12px] text-[#BB3A2B]">
              · {caution}
            </li>
          ))}
        </ul>
      )}

      {showRecheck && (
        <button
          type="button"
          onClick={onRecheck}
          disabled={recheckPending}
          className="mt-3 bg-[#BB3A2B] disabled:opacity-60 text-white text-[12.5px] font-bold rounded-full px-4 py-1.5"
        >
          {recheckPending ? "이동 중..." : "피부과 상담 / 재검사"}
        </button>
      )}
    </div>
  );
}
