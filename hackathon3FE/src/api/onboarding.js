import { apiClient, unwrap } from "./client";

// GET /api/onboarding
// → { onboardingId, name, purpose, goalDate, age, gender, baseType,
//     flags, safety, notiEnabled, dDay, createdAt }
export async function getOnboarding() {
  const res = await apiClient.get("/api/onboarding");
  return unwrap(res);
}

// POST /api/onboarding/restart → 재검사 시작 (성공하면 /onboarding으로 이동해서
// POST /api/onboarding으로 새 설문을 다시 제출해야 함)
export async function restartOnboarding() {
  const res = await apiClient.post("/api/onboarding/restart");
  return unwrap(res);
}
