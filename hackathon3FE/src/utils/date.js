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

/**
 * 2일 전 ~ 4일 후, 총 7일짜리 주간 스트립.
 * 서버가 날짜별 완료 이력을 아직 안 주기 때문에, 지난 날짜는 일단 전부
 * "완료"로 보이게 표시합니다(백엔드에 일별 이력 API 생기면 isPast 대신
 * 실제 completed 값으로 바꾸면 됨).
 */
export function buildWeekStrip(centerDate) {
  const days = [];
  for (let offset = -2; offset <= 4; offset++) {
    const d = new Date(centerDate);
    d.setDate(d.getDate() + offset);
    days.push({
      date: isoDate(d),
      day: d.getDate(),
      weekdayLabel: WEEKDAY_LABELS[d.getDay()],
      isToday: offset === 0,
      isPast: offset < 0,
    });
  }
  return days;
}
