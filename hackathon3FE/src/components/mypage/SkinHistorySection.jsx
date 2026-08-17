import { useState } from "react";

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

export default function SkinHistorySection({ history, onAdd }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-4">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex flex-col items-center gap-1"
      >
        <span className="self-start text-[17px] text-[#1f1f1f]">피부 히스토리</span>
        <span className="text-[#6C6C6C] text-[15px] leading-none">{expanded ? "⌃" : "⌄"}</span>
      </button>

      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          {history.length === 0 ? (
            <div className="text-center text-[14px] text-[#9a958c] py-4">
              아직 기록된 히스토리가 없어요.
            </div>
          ) : (
            history.map((item) =>
              item.completed ? (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#D9D9D9] rounded-xl px-3 py-2.5"
                >
                  <div>
                    <div className="text-[15px] text-[#1f1f1f]">
                      {formatDate(item.createdAt)} 종료
                    </div>
                    <div className="mt-1 text-[14px] font-medium text-[#6f6c62]">
                      {item.journeySummary}
                    </div>
                    {typeof item.todoCompletionRate === "number" && (
                      <div className="text-[14px] font-medium text-[#6f6c62]">
                        달성률: {item.todoCompletionRate}%
                      </div>
                    )}
                  </div>
                  <span className="text-[#6C6C6C] text-[16px]">›</span>
                </div>
              ) : (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#D9D9D9] rounded-xl px-3 py-2.5"
                >
                  <div>
                    <div className="text-[15px] text-[#285E3C]">진행중</div>
                    {item.purpose && (
                      <div className="mt-1 text-[14px] font-medium text-[#6f6c62]">
                        목표: {item.purpose}
                      </div>
                    )}
                    {item.goalDate && (
                      <div className="text-[14px] font-medium text-[#6f6c62]">
                        목표일: {item.goalDate}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )
          )}

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center bg-[#D9D9D9] rounded-xl py-3 text-[#8a877f] text-[20px]"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
