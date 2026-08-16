const STATUS_LABEL = {
  MAINTAIN: "현재 루틴 유지",
  REDUCE: "빈도 줄이기",
  PAUSE: "일시 중단",
  RECHECK: "재검사 권장",
};

export default function ConcernResult({ result, onRecheck, recheckPending }) {
  if (!result) {
    return (
      <div className="mt-4 w-full bg-[#F3F2EE] rounded-2xl p-4 text-center">
        <div className="text-[14px] font-medium text-[#9a958c] leading-relaxed">
          고민을 입력하고 전송하면
          <br />
          여기에 AI 응답이 표시돼요
        </div>
      </div>
    );
  }

  const showRecheck = result.status === "RECHECK" || result.medicalReferral;

  return (
    <div className="mt-4 w-full bg-[#F3F2EE] rounded-2xl p-4 text-left">
      {result.status && (
        <span className="text-[13px] font-bold text-[#285E3C] bg-[#E2D9D0] rounded-full px-3 py-1">
          {STATUS_LABEL[result.status] || result.status}
        </span>
      )}

      <div className="mt-2.5 text-[15px] font-medium text-[#1f1f1f] leading-snug">
        {result.message}
      </div>

      {result.cautions?.length > 0 && (
        <ul className="mt-2.5 space-y-1.5">
          {result.cautions.map((caution) => (
            <li key={caution} className="text-[13.5px] text-[#BB3A2B]">
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
          className="mt-3 bg-[#BB3A2B] disabled:opacity-60 text-white text-[14px] font-bold rounded-full px-4 py-2"
        >
          {recheckPending ? "이동 중..." : "피부과 상담 / 재검사"}
        </button>
      )}
    </div>
  );
}
