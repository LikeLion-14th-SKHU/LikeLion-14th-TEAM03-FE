import { useState } from "react";
import { Link } from "react-router-dom";
import { skinTypeLabel } from "../../utils/skinType";

export default function ProfileCard({ name, baseType, goalDate, onGoalDateChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goalDate);

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
    <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-4">
      <Link to="/skin-result" className="flex items-center justify-between">
        <div>
          <div className="text-[18px] text-[#1f1f1f]">{name}</div>
          <div className="mt-0.5 text-[14px] font-medium text-[#8a877f]">
            {skinTypeLabel(baseType)}타입
          </div>
        </div>
        <span className="text-[#6C6C6C] text-[26px]">›</span>
      </Link>

      <div className="mt-3 pt-3 border-t border-[#00000014]">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#6f6c62]">목표 날짜</span>
          {!editing && (
            <button
              type="button"
              onClick={handleEditOpen}
              className="translate-y-4 text-[15px] text-[#2A2A2A]"
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
              className="flex-1 min-w-0 text-[14px] rounded-lg border border-[#E2D9D0] bg-white px-2.5 py-1.5 text-[#1f1f1f] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCancel}
              className="shrink-0 text-[14px] font-semibold text-[#9a958c] px-2 py-1.5"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!draft}
              className="shrink-0 text-[14px] text-white bg-[#2A2A2A] disabled:opacity-50 rounded-lg px-3 py-1.5"
            >
              저장
            </button>
          </div>
        ) : (
          <div className="mt-1.5 text-[16px] text-[#1f1f1f]">{goalDate}</div>
        )}
      </div>
    </div>
  );
}
