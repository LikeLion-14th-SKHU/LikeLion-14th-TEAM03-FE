function RateRow({ label, rate }) {
  const pct = Math.round((rate || 0) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[12.5px] font-semibold text-[#6f6c62]">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-[#EDEDEA] overflow-hidden">
        <div
          className="h-full bg-[#2A2A2A] rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TodoProgressCard({ progress }) {
  const { cleansingRate = 0, skincareRate = 0 } = progress || {};

  return (
    <div className="bg-[#F8F8F8] rounded-2xl shadow-sm p-4">
      <div className="text-[14px] font-bold text-[#1f1f1f]">투두 달성률</div>
      <div className="mt-3 flex flex-col gap-2.5">
        <RateRow label="세안" rate={cleansingRate} />
        <RateRow label="스킨 케어" rate={skincareRate} />
      </div>
    </div>
  );
}
