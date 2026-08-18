import { apiClient, unwrap } from "./client";

// GET /api/plan/before-score
// D-Day 종료 화면 진입 시 호출합니다. 온보딩 때 계산된 trouble_scores 중
// 가장 높은 항목과 그 점수를 백엔드가 대신 골라서 돌려줍니다(프론트에서 계산할 필요 없음).
// → { afterScoreKey, beforeScoreValue }
export async function getBeforeScore() {
  const res = await apiClient.get("/plan/before-score");
  return unwrap(res);
}

// POST /api/plan/finish  body: { afterScoreKey, afterScoreValue }
// afterScoreKey: "피지량" | "댕김" | "여드름" | "붉은기" 중 1개
// afterScoreValue: 1~10
// D-Day 종료 시 호출합니다. AI가 30일 여정 리포트를 생성해서 결과를 바로 돌려줍니다.
// → { journeySummary, improvementPoints, recommendationNext, todoCompletionRate,
//     afterScoreKey, afterScoreValue, createdAt }
export async function finishPlan({ afterScoreKey, afterScoreValue }) {
  const res = await apiClient.post("/plan/finish", {
    afterScoreKey,
    afterScoreValue,
  });
  return unwrap(res);
}

// GET /api/plan/result
// 이미 종료된 플랜의 리포트를 다시 조회할 때 사용합니다(응답 형태는 finishPlan과 동일).
export async function getPlanResult() {
  const res = await apiClient.get("/plan/result");
  return unwrap(res);
}
