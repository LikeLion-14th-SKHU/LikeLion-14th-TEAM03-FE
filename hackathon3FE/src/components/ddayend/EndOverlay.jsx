export default function EndOverlay({ onConfirm }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col overflow-hidden">
      {/* 위쪽: 홈 화면이 어둡게 깔린 느낌만 살린 여백 */}
      <div className="flex-[0.85] bg-black/15" />

      {/* 아래쪽: 흰색 바텀시트 */}
      <div className="flex flex-[1.3] flex-col items-center rounded-t-2xl bg-white px-6 pb-6 pt-12 text-center shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="text-[28px] font-bold text-[#1f1f1f]">
            🎉 솔루션이 종료되었어요 🎉
          </div>
          <div className="mt-3 text-[15.5px] font-medium text-[#9a958c]">
            결산 페이지로 이동합니다.
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-xl bg-[#285E3C] py-4 text-[15px] font-bold text-white"
        >
          이동하기
        </button>
      </div>
    </div>
  );
}
