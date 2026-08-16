import { useState } from "react";
import { skinTypeLabel } from "../../utils/skinType";

function getDday(goalDate) {
  if (!goalDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(goalDate);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function ddayLabel(dday) {
  if (dday === null) return "";
  if (dday === 0) return "D-DAY";
  return dday > 0 ? `D-${dday}` : `D+${Math.abs(dday)}`;
}

export default function ProfileCard({ name, baseType, goalDate, onGoalDateChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goalDate);

  const dday = getDday(goalDate);

  function handleEditOpen() {
    setDraft(goalDate);
    setEditing(true);
  }

  function handleSave() {
    if (draft) onGoalDateChange(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(goalDate);
    setEditing(false);
  }

  return (
    <div className="bg-[#EFEFEF] rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[16px] font-bold text-[#1f1f1f]">{name}</div>
          <div className="mt-0.5 text-[12.5px] font-medium text-[#8a877f]">
            {skinTypeLabel(baseType)}타입
          </div>
        </div>
        {dday !== null && (
          <span className="text-[13px] font-bold text-[#285E3C] bg-white rounded-full px-3 py-1">
            {ddayLabel(dday)}
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-[#00000014]">
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-semibold text-[#6f6c62]">목표 날짜</span>
          {!editing && (
            <button
              type="button"
              onClick={handleEditOpen}
              className="text-[12.5px] font-bold text-[#285E3C]"
            >
              수정
            </button>
          )}
        </div>

        {editing ? (
          <div className="mt-2 flex items-center gap-1.5">
            <input
              type="date"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 min-w-0 text-[12.5px] rounded-lg border border-[#E2D9D0] bg-white px-2.5 py-1.5 text-[#1f1f1f] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCancel}
              className="shrink-0 text-[12.5px] font-semibold text-[#9a958c] px-2 py-1.5"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!draft}
              className="shrink-0 text-[12.5px] font-bold text-white bg-[#285E3C] disabled:opacity-50 rounded-lg px-3 py-1.5"
            >
              저장
            </button>
          </div>
        ) : (
          <div className="mt-1.5 text-[14px] font-bold text-[#1f1f1f]">{goalDate}</div>
        )}
      </div>
    </div>
  );
}
