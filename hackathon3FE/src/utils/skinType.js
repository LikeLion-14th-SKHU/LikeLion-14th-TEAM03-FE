// 온보딩 채점 로직(base_type)이 반환하는 코드값 → 화면 표시용 한글 라벨
const LABELS = {
  OILY: "지성",
  DRY: "건성",
  COMBO: "복합성",
  NORMAL: "수분",
};

export function skinTypeLabel(baseType) {
  return LABELS[baseType] || baseType || "-";
}
