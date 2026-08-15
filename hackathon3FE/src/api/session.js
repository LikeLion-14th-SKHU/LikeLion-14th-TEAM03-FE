import { apiClient, unwrap } from "./client";

// POST /api/session → 세션 생성 (앱 첫 진입 시 호출. 이미 유효한 세션 쿠키가 있으면
// 서버가 기존 세션을 그대로 반환합니다)
export async function createSession() {
  const res = await apiClient.post("/api/session");
  return unwrap(res);
}

// GET /api/session → 세션 확인 (필요할 때만 수동으로 사용)
export async function checkSession() {
  const res = await apiClient.get("/api/session");
  return unwrap(res);
}
