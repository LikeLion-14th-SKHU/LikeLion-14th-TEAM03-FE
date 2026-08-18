// 백엔드가 improvementPoints/recommendationNext를 배열로 내려줄 때도,
// 그 배열을 JSON 문자열 그대로("["...", "..."]") 내려줄 때도 있어서
// 두 경우 모두 대괄호/따옴표 없이 문장 목록으로 정리합니다.
function toTextList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch {
        // JSON 배열 형태가 아니면 원본 문자열을 그대로 씁니다.
      }
    }
    return [trimmed];
  }
  return [String(value)];
}

function ProgressRow({ label, rate }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-[14px] font-semibold text-[#000000]">
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E0E0E0]">
        <div
          className="h-full rounded-full bg-[#285E3C]"
          style={{ width: `${rate}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-[14px] text-[#1f1f1f]">
        {rate}%
      </span>
    </div>
  );
}

export default function ResultSummary({ journey, onRestart, onFinish }) {
  const {
    purpose,
    totalDays,
    scoreKey,
    beforeScore,
    afterScore,
    todoStats,
    improvementPoints,
    recommendationNext,
  } = journey;

  const diff = beforeScore - afterScore;
  const improvementRate =
    beforeScore > 0 ? Math.round((diff / beforeScore) * 100) : 0;

  const changeMessage =
    diff > 0
      ? `${improvementRate}%정도 개선되었어요`
      : diff < 0
      ? "조금 더 관리가 필요해 보여요"
      : "큰 변화 없이 유지됐어요";

  const improvementList = toTextList(improvementPoints);
  const recommendationList = toTextList(recommendationNext);

  return (
    <div className="flex min-h-full flex-col px-4 pb-2">
      <div className="text-[32px]">🎉</div>
      <div className="mt-2 text-[30px] font-semibold leading-snug text-[#1f1f1f]">
        {totalDays}일 간의 피부 관리가
        <br />
        끝났어요
      </div>

      <div className="mt-5 rounded-2xl bg-[#EEEEEE] px-5 py-4">
        <div className="text-[15px]  text-[#9a958c]">이번 여정 요약</div>
        <div className="mt-1 text-[25px]  text-[#1f1f1f]">
          <span className="font-bold">{purpose}</span>을 위해
          <br />
          {totalDays}일 동안 피부를 관리했어요
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-[#EEEEEE] p-5">
        <div className="text-[25px] text-[#000000]">주요 피부 변화</div>
        <div className="mt-1 text-[14px]  text-[#6f6c62]">
          {scoreKey}: {beforeScore} → {afterScore}
          <span className="ml-1.5 text-[#285E3C]">{changeMessage}</span>
        </div>

        <div className="mt-7 text-[25px] text-[#000000]">체크리스트 진행률</div>
        <div className="mt-0.5 text-[15px] text-[#6C6C6C]">나와의 약속</div>
        <div className="mt-3 flex flex-col gap-2.5">
          <ProgressRow label="세안" rate={todoStats.cleansingRate} />
          <ProgressRow label="스킨케어" rate={todoStats.skincareRate} />
          <ProgressRow label="전체 관리율" rate={todoStats.totalRate} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#EEEEEE] p-4">
          <div className="text-[17px] text-[#6C6C6C]">잘한 점</div>
          <div className="mt-1.5 flex flex-col gap-1.5 text-[13px]  leading-snug text-[#000000]">
            {improvementList.length > 0 ? (
              improvementList.map((text, index) => <p key={index}>{text}</p>)
            ) : (
              <p>아직 리포트를 준비 중이에요</p>
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-[#EEEEEE] p-4">
          <div className="text-[17px] text-[#6C6C6C]">앞으로 추천</div>
          <div className="mt-1.5 flex flex-col gap-1.5 text-[13px]  leading-snug text-[#000000]">
            {recommendationList.length > 0 ? (
              recommendationList.map((text, index) => <p key={index}>{text}</p>)
            ) : (
              <p>아직 리포트를 준비 중이에요</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-2 mt-5 flex justify-between">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg bg-[#D9D9D9] px-6 py-2 text-[15px] text-[#1f1f1f]"
        >
          다시하기
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="rounded-lg bg-[#285E3C] px-6 py-2 text-[15px] text-white"
        >
          마침
        </button>
      </div>
    </div>
  );
}
