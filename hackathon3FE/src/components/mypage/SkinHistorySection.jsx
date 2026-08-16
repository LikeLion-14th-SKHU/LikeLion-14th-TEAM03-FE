import { useState } from "react";

export default function SkinHistorySection({ history, onAdd }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-[#EFEFEF] rounded-2xl shadow-sm p-4">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex flex-col items-center gap-1"
      >
        <span className="self-start text-[15px] font-bold text-[#1f1f1f]">피부 히스토리</span>
        <span className="text-[#c9c6bd] text-[14px] leading-none">{expanded ? "⌃" : "⌄"}</span>
      </button>

      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          {history.length === 0 ? (
            <div className="text-center text-[12.5px] text-[#9a958c] py-4">
              아직 기록된 히스토리가 없어요.
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#F3F2EE] rounded-xl px-3 py-2.5"
              >
                <div>
                  <div className="text-[13px] font-bold text-[#1f1f1f]">{item.range}</div>
                  <div className="mt-1 text-[12px] font-medium text-[#6f6c62]">
                    목표: {item.goal}
                  </div>
                  <div className="text-[12px] font-medium text-[#6f6c62]">
                    총 기간: {item.totalDays}일
                  </div>
                </div>
                <span className="text-[#c9c6bd] text-[16px]">›</span>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center bg-[#F3F2EE] rounded-xl py-3 text-[#8a877f] text-[18px] font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
