import { apiClient, unwrap } from "./client";

// GET /api/mypage
// → {
//     myInfo: { name, baseType, flags, purpose, goalDate, dDay },
//     skinResult: { ...GET /api/skin/result 동일... },
//     todoStats: { totalDays, cleansingDone, skincareDone, cleansingRate, skincareRate },
//     planResult: null | { journeySummary, improvementPoints, recommendationNext,
//                           todoCompletionRate, afterScoreKey, afterScoreValue, createdAt }
//   }
// 주의: cleansingRate/skincareRate는 0~100 사이의 정수(퍼센트)로 내려옵니다.
export async function getMypage() {
  const res = await apiClient.get("/mypage");
  return unwrap(res);
}

// GET /api/mypage/history
// → [{ onboardingId, purpose, goalDate, baseType, isActive, createdAt,
//      journeySummary, improvementPoints, recommendationNext,
//      todoCompletionRate, afterScoreKey, afterScoreValue }]
// 현재 세션의 모든 플랜 히스토리(진행중 + 종료된 플랜 전부)를 최신순으로 반환합니다.
export async function getMypageHistory() {
  const res = await apiClient.get("/mypage/history");
  return unwrap(res);
}
