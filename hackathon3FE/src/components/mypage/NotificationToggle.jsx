export default function NotificationToggle({ enabled, onToggle, pending }) {
  return (
    <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <span className="text-[16px] text-[#1f1f1f]">알림 설정</span>
        <button
          type="button"
          onClick={onToggle}
          disabled={pending}
          aria-pressed={enabled}
          className={
            "relative w-11 h-6 rounded-full transition-colors disabled:opacity-60 " +
            (enabled ? "bg-[#2A2A2A]" : "bg-[#D9D9D9]")
          }
        >
          <span
            className={
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform " +
              (enabled ? "translate-x-5" : "translate-x-0")
            }
          />
        </button>
      </div>
    </div>
  );
}
