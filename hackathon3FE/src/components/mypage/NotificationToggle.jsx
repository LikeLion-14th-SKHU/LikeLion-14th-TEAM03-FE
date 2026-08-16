function ToggleRow({ label, enabled, onToggle, pending }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[13.5px] font-semibold text-[#1f1f1f]">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        disabled={pending}
        aria-pressed={enabled}
        className={
          "relative w-11 h-6 rounded-full transition-colors disabled:opacity-60 " +
          (enabled ? "bg-[#285E3C]" : "bg-[#D9D9D9]")
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
  );
}

export default function NotificationToggle({
  cleansingEnabled,
  skincareEnabled,
  onToggleCleansing,
  onToggleSkincare,
  cleansingPending,
  skincarePending,
}) {
  return (
    <div className="bg-[#EFEFEF] rounded-2xl shadow-sm p-4">
      <span className="text-[14px] font-bold text-[#1f1f1f]">알림 설정</span>
      <div className="mt-1 divide-y divide-[#00000012]">
        <ToggleRow label="세안 알림" enabled={cleansingEnabled} onToggle={onToggleCleansing} pending={cleansingPending} />
        <ToggleRow label="스킨케어 알림" enabled={skincareEnabled} onToggle={onToggleSkincare} pending={skincarePending} />
      </div>
    </div>
  );
}
