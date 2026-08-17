const ANSWER_VALUE_BY_OPTION = {
  A1: { "a1-1": 1, "a1-2": 2, "a1-3": 3, "a1-4": 4 },
  A2: { "a2-1": 1, "a2-2": 2, "a2-3": 3, "a2-4": 4 },
  A3: { "a3-1": 1, "a3-2": 2, "a3-3": 3, "a3-4": 4 },
  A4: { "a4-1": 1, "a4-2": 2, "a4-3": 3, "a4-4": 4 },
  B1: { "b1-1": 1, "b1-2": 2, "b1-3": 3, "b1-4": 4 },
  B2: { "b2-1": 1, "b2-2": 2, "b2-3": 3, "b2-4": 4, "b2-5": 2.5 },
  B3: { "b3-1": 1, "b3-2": 2, "b3-3": 3, "b3-4": 4 },
  D1: { "d1-1": 1, "d1-2": 2, "d1-3": 3, "d1-4": 4, "d1-5": 2.5 },
  D2: { "d2-1": 1, "d2-2": 2, "d2-3": 3, "d2-4": 4 },
  E1: { "e1-1": 1, "e1-2": 2, "e1-3": 3, "e1-4": 4, "e1-5": 2.5 },
  E2: { "e2-1": 1, "e2-2": 2, "e2-3": 3, "e2-4": 4 },
  F1: { "f1-1": 1, "f1-2": 2, "f1-3": 3, "f1-4": 4 },
  F2: { "f2-1": 2, "f2-2": 3, "f2-3": 4 },
  G1: { "g1-1": 1, "g1-2": 2, "g1-3": 3, "g1-4": 4 },
};

const H1_LABEL_MAP = {
  "h1-1": "여드름",
  "h1-2": "주사(안면홍조)",
  "h1-3": "아토피 피부염",
  "h1-4": "접촉성 피부염",
  "h1-5": "습진",
  "h1-6": "진단받은 적 없어요",
};

const H2_LABEL_MAP = {
  "h2-1": "no",
  "h2-2": "topical",
  "h2-3": "oral",
  "h2-4": "both",
};

const H3_LABEL_MAP = {
  "h3-1": "current",
  "h3-2": "past",
  "h3-3": "irritated",
  "h3-4": "never",
};

const C1_LABEL_MAP = {
  "c1-1": "zone_diff_false",
  "c1-2": "zone_diff_true",
  "c1-3": "zone_diff_false",
  "c1-4": "zone_diff_false",
};

function getNumericAnswer(questionId, optionId) {
  if (!optionId) return undefined;
  return ANSWER_VALUE_BY_OPTION[questionId]?.[optionId];
}

function getH1Values(optionIds = []) {
  const selected = (Array.isArray(optionIds) ? optionIds : [])
    .map((id) => H1_LABEL_MAP[id])
    .filter(Boolean);

  if (!selected.length) return [];

  const cleaned = selected.filter((label) => label !== "진단받은 적 없어요");

  if (selected.includes("진단받은 적 없어요")) {
    return selected.includes("진단받은 적 없어요") && cleaned.length === 0
      ? ["진단받은 적 없어요"]
      : cleaned;
  }

  return cleaned;
}

export function computeOnboardingWeights(answers = {}) {
  const normalized = {
    a1: getNumericAnswer("A1", answers.A1),
    a2: getNumericAnswer("A2", answers.A2),
    a3: getNumericAnswer("A3", answers.A3),
    a4: getNumericAnswer("A4", answers.A4),
    b1: getNumericAnswer("B1", answers.B1),
    b2: getNumericAnswer("B2", answers.B2),
    b3: getNumericAnswer("B3", answers.B3),
    c1: C1_LABEL_MAP[answers.C1] ?? "zone_diff_false",
    d1: getNumericAnswer("D1", answers.D1),
    d2: getNumericAnswer("D2", answers.D2),
    e1: getNumericAnswer("E1", answers.E1),
    e2: getNumericAnswer("E2", answers.E2),
    f1: getNumericAnswer("F1", answers.F1),
    f2: answers.F1 === "f1-1" ? 0 : getNumericAnswer("F2", answers.F2),
    g1: getNumericAnswer("G1", answers.G1),
    h1: getH1Values(answers.H1),
    h2: H2_LABEL_MAP[answers.H2] ?? "no",
    h3: H3_LABEL_MAP[answers.H3] ?? "never",
  };

  return normalized;
}

export function persistOnboardingWeights(answers = {}) {
  const weights = computeOnboardingWeights(answers);
  window.localStorage.setItem(
    "onboardingSurveyWeights",
    JSON.stringify(weights),
  );
  return weights;
}

export function buildOnboardingPayload({
  profile,
  purpose = "",
  goalDate = "",
  answers = {},
  concernRaw = "",
}) {
  const surveyAnswers = computeOnboardingWeights(answers);

  return {
    name: String(profile?.nickname || "").trim() || "사용자",
    purpose: String(purpose || "").trim(),
    goalDate: goalDate || null,
    age: Number(profile?.age ?? 0),
    gender:
      String(profile?.gender || "male").toUpperCase() === "FEMALE"
        ? "FEMALE"
        : "MALE",
    surveyAnswers,
    concernRaw: String(concernRaw || purpose || "").trim(),
  };
}
