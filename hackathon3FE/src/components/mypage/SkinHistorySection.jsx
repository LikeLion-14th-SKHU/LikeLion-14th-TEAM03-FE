import { useState } from "react";
import { skinTypeLabel } from "../../utils/skinType";

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

// createdAt(플랜 생성일) ~ goalDate(목표일) 사이 일수. 백엔드가 총 기간을 따로
// 안 줘서, 두 날짜 차이로 계산합니다.
function totalDays(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  return Math.round((end - start) / 86400000);
}

// 백엔드가 리스트형 필드(개선 포인트 등)를 배열로 줄 때도, 그 배열을 JSON
// 문자열 그대로("["...", "..."]") 줄 때도 있어서 두 경우 모두 대괄호/따옴표
// 없이 문장 목록으로 정리합니다.
function toTextList(value) {
  if (!value && value !== 0) return [];
  if (Array.isArray(value)) return value.filter((v) => v || v === 0);
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

function HistoryDetailRow({ label, value }) {
  const items = toTextList(value);
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-1.5 py-3 first:pt-0 last:pb-0">
      <span className="text-[15px] font-bold tracking-tight text-[#285E3C]">
        {label}
      </span>
      <div className="flex flex-col gap-1.5">
        {items.map((text, index) => (
          <p
            key={index}
            className="text-[14px] font-normal leading-relaxed text-[#4a4a46]"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function SkinHistorySection({ history, onAdd }) {
  const [expanded, setExpanded] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);

  return (
    <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-4">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex flex-col items-center gap-1"
      >
        <span className="self-start text-[17px] text-[#1f1f1f]">피부 히스토리</span>
        <span className="text-black text-[16px] leading-none">{expanded ? "⌃" : "⌄"}</span>
      </button>

      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          {history.length === 0 ? (
            <div className="text-center text-[15px] text-black py-4">
              아직 기록된 히스토리가 없어요.
            </div>
          ) : (
            history.map((item) =>
              item.completed ? (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    setOpenItemId((prev) => (prev === item.id ? null : item.id))
                  }
                  className="w-full text-left bg-[#D9D9D9] rounded-xl px-3 py-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[16px] text-black">
                        {formatDate(item.createdAt)} ~ {formatDate(item.goalDate)}
                      </div>
                      <div className="mt-1 text-[15px] font-medium text-[#2A2A2A]">
                        목표: {item.purpose}
                      </div>
                      {totalDays(item.createdAt, item.goalDate) !== null && (
                        <div className="text-[15px] font-medium text-[#2A2A2A]">
                          총 기간: {totalDays(item.createdAt, item.goalDate)}일
                        </div>
                      )}
                    </div>
                    <span
                      className={
                        "text-black text-[18px] transition-transform " +
                        (openItemId === item.id ? "rotate-90" : "")
                      }
                    >
                      ›
                    </span>
                  </div>

                  {openItemId === item.id && (
                    <div className="mt-3 divide-y divide-[#e5e2dc] rounded-xl bg-white px-3.5 py-2 shadow-sm">
                      <HistoryDetailRow
                        label="피부타입"
                        value={item.baseType ? skinTypeLabel(item.baseType) : null}
                      />
                      <HistoryDetailRow
                        label="종료 리포트 요약"
                        value={item.journeySummary}
                      />
                      <HistoryDetailRow
                        label="개선 포인트"
                        value={item.improvementPoints}
                      />
                      <HistoryDetailRow
                        label="다음 추천"
                        value={item.recommendationNext}
                      />
                      <HistoryDetailRow
                        label="달성률"
                        value={
                          typeof item.todoCompletionRate === "number"
                            ? `${item.todoCompletionRate}%`
                            : null
                        }
                      />
                      <HistoryDetailRow label="개선 항목" value={item.afterScoreKey} />
                      <HistoryDetailRow
                        label="개선 점수"
                        value={item.afterScoreValue}
                      />
                    </div>
                  )}
                </button>
              ) : (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#D9D9D9] rounded-xl px-3 py-2.5"
                >
                  <div>
                    <div className="text-[16px] text-black">
                      {formatDate(item.createdAt)} ~ {formatDate(item.goalDate)}
                    </div>
                    <div className="mt-1 text-[15px] font-medium text-[#2A2A2A]">
                      목표: {item.purpose}
                    </div>
                    {totalDays(item.createdAt, item.goalDate) !== null && (
                      <div className="text-[15px] font-medium text-[#2A2A2A]">
                        총 기간: {totalDays(item.createdAt, item.goalDate)}일
                      </div>
                    )}
                    <div className="mt-1 text-[14px] text-[#285E3C]">
                      진행중
                    </div>
                  </div>
                </div>
              ),
            )
          )}

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center bg-[#D9D9D9] rounded-xl py-3 text-black text-[21px]"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
