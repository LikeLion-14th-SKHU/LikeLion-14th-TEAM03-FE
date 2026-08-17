import { apiClient, unwrap } from "./client";

// GET /api/cards → { cards: [{ cardId, cardType, cardSummary, ddayAtTime,
//   status, prescribedIngredients, excludedIngredients, createdAt }] }
// cardType: INITIAL | UPDATE | DDAY_CHANGE
export async function getCards() {
  const res = await apiClient.get("/cards");
  return unwrap(res)?.cards ?? [];
}

// POST /api/cards/concern  body: { newConcern }
// → { status, message, cautions, medicalReferral }
// status: MAINTAIN | REDUCE | PAUSE | RECHECK
// medicalReferral: true면 피부과 상담/재검사 유도
// (서버가 이 호출로 카드 히스토리에도 새 카드를 추가하므로, 성공 후 GET /api/cards를
//  다시 불러와야 목록에 반영됩니다)
export async function addConcern(newConcern) {
  const res = await apiClient.post("/cards/concern", { newConcern });
  return unwrap(res);
}
