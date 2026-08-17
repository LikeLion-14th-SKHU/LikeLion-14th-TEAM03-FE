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
