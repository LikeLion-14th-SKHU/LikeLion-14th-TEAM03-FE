// 오늘 세안+스킨케어를 둘 다 체크했을 때만 홈에 보여주는 완료 배너.
export default function TodayCompleteBanner() {
  return (
    <div className="flex items-center justify-center gap-1.5 rounded-xl bg-[#E7F0EA] py-2.5 text-[14px] font-bold text-[#285E3C]">
      <span aria-hidden="true">✅</span>
      오늘의 기록 완료!
    </div>
  );
}
