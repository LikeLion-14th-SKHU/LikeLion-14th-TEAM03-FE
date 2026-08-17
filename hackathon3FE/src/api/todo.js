import { apiClient, unwrap } from "./client";

// GET /api/todo/progress
// → { totalDays, cleansingDone, skincareDone, cleansingRate, skincareRate }
// 주의: 이건 "오늘 체크했는지"가 아니라 전체 기간 누적 통계입니다.
export async function getProgress() {
  const res = await apiClient.get("/todo/progress");
  return unwrap(res);
}

// POST /api/todo/check  body: { cleansingDone, skincareDone }
// 오늘 체크 상태를 저장합니다. 두 값을 항상 함께 보내야 해요(부분 업데이트 아님).
export async function saveTodoCheck({ cleansingDone, skincareDone }) {
  const res = await apiClient.post("/todo/check", {
    cleansingDone,
    skincareDone,
  });
  return unwrap(res);
}
