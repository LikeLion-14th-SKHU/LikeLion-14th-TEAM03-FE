import { useState } from "react";

export default function ConcernInput({ onSubmit, pending, error }) {
  const [text, setText] = useState("");

  async function handleSubmit() {
    if (!text.trim() || pending) return;
    await onSubmit(text.trim());
    setText("");
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm px-3 py-4 text-center flex flex-col items-center">
      <div className="text-[17px] font-bold text-[#1f1f1f]">
        <span className="text-[#BB3A2B]">새로운 고민</span>이 생겼나요?
      </div>
      <div className="mt-1 text-[12.5px] font-medium text-[#8a877f]">
        입력하시면 언제든 반영해드려요.
      </div>

      <div className="mt-3 w-full flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="요즘 피부 고민을 편하게 적어주세요"
          className="w-full min-h-[140px] rounded-xl bg-[#ECECEC] px-4 py-3 text-[14px] text-[#1f1f1f] resize-none focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim() || pending}
          className="self-end bg-[#1f1f1f] disabled:bg-[#a8a8a5] text-white rounded-lg px-4 py-1.5 text-[12.5px] font-bold"
        >
          {pending ? "전송 중..." : "전송하기"}
        </button>
      </div>

      {error && <div className="mt-3 text-[13px] font-semibold text-[#BB3A2B]">{error}</div>}
    </div>
  );
}
