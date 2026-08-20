export const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function pad(n) {
  return String(n).padStart(2, "0");
}

export function isoDate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function formatHeaderDate(date) {
  return `${pad(date.getMonth() + 1)}월 ${pad(date.getDate())}일`;
}

// startIso ~ endIso 사이 일수(음수/NaN이면 0). 시작일~목표일 사이 총 기간이나
// 시작일~오늘 사이 경과일을 구할 때 씁니다.
export function daysBetween(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  return Math.max(Math.round((end - start) / 86400000), 0);
}

/**
 * 2일 전 ~ 4일 후, 총 7일짜리 주간 스트립.
 * 서버에 날짜별 완료 이력 API가 없어서, checkHistory(이 브라우저 안에 날짜별로
 * 쌓인 "그날 체크리스트를 다 했는지" 기록)에 있는 값만 그대로 반영합니다.
 * 기록이 없는 날짜(과거든 미래든)는 전부 미완료(흰색)로 표시됩니다 — 즉 매일
 * 체크할 때마다 그날 기록이 자동으로 쌓이는 구조예요.
 * startDateIso(플랜 시작일)보다 이전 날짜는 애초에 체크할 수 없었던 날이므로
 * "미완료"가 아니라 그냥 날짜(isBeforeStart)로만 표시합니다.
 */
export function buildWeekStrip(centerDate, checkHistory = {}, startDateIso) {
  const startDate = startDateIso ? isoDate(new Date(startDateIso)) : null;
  const days = [];
  for (let offset = -2; offset <= 4; offset++) {
    const d = new Date(centerDate);
    d.setDate(d.getDate() + offset);
    const date = isoDate(d);
    days.push({
      date,
      day: d.getDate(),
      weekdayLabel: WEEKDAY_LABELS[d.getDay()],
      isToday: offset === 0,
      isPast: offset < 0,
      isChecked: !!checkHistory[date],
      isBeforeStart: !!startDate && date < startDate,
    });
  }
  return days;
}
