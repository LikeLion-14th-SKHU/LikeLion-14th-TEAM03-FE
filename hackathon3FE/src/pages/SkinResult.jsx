import { useEffect, useState } from "react";
import { getSkinResult } from "../api/skinResult";

const GREEN = "#2d6a4a";

function Logo() {
  return (
    <div className="px-5 pb-2 pt-5">
      <span
        style={{
          fontWeight: 900,
          fontSize: 28,
          letterSpacing: -1,
          color: "#111",
        }}
      >
        아빠ㄴ
      </span>
    </div>
  );
}

function CheckIcon() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: GREEN,
        flexShrink: 0,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6l3 3 5-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      style={{ flexShrink: 0 }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      style={{ flexShrink: 0 }}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function normalizeProducts(products = []) {
  return (Array.isArray(products) ? products : []).filter(Boolean);
}

function IngredientCard({ name, effect, caution, products }) {
  return (
    <div className="mb-3 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <CheckIcon />
        <span style={{ fontWeight: 700, fontSize: 16, color: GREEN }}>
          {name}
        </span>
      </div>
      <div className="mb-1 text-sm text-gray-800">
        <span className="mr-2 text-gray-500">효과:</span>
        {effect}
      </div>
      <div className="border-b border-gray-100 pb-3 text-sm text-gray-800">
        <span className="mr-2 text-gray-500">주의:</span>
        {caution}
      </div>
      {products && products.length > 0 && (
        <div className="mt-4">
          <p className="mb-3 text-xs text-gray-500">추천 제품 라인업</p>
          <div className="grid grid-cols-2 gap-2">
            {products.map((product) => (
              <div key={product} className="flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-xl bg-gray-200"
                  style={{ aspectRatio: "4/3" }}
                />
                <span className="text-xs text-gray-600">{product}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TreatmentCard({ name, description, time, recovery, cycle }) {
  return (
    <div className="mb-3 rounded-2xl bg-white p-5 shadow-sm">
      <p
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: GREEN,
          marginBottom: 6,
        }}
      >
        {name}
      </p>
      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        {description}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <ClockIcon />
          <span className="text-gray-500" style={{ width: 80 }}>
            시술 시간:
          </span>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarIcon />
          <span className="text-gray-500" style={{ width: 80 }}>
            회복 기간:
          </span>
          <span>{recovery}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CycleIcon />
          <span className="text-gray-500" style={{ width: 80 }}>
            권장 주기:
          </span>
          <span>{cycle}</span>
        </div>
      </div>
    </div>
  );
}

const defaultIngredients = [
  {
    name: "나이아신아마이드",
    effect: "피지 조절, 항염 효과",
    caution: "고농도 사용 시 피부 자극이 있을 수 있으니 저농도부터 시작하세요.",
    products: ["토너", "세럼", "앰플", "크림"],
  },
  {
    name: "살리실산",
    effect: "유분 생성 억제, 진정",
    caution: "건조함을 유발할 수 있으니 보습제와 병행하세요.",
    products: [],
  },
];

const defaultTreatments = [
  {
    name: "홍조·혈관 솔루션",
    description:
      "홍조 원인과 피부 상태 및 재발 가능성을 고려한 최적 레이저·고주파 조합 치료 프로그램",
    time: "약 20~40분",
    recovery: "즉시 생활 가능",
    cycle: "2~4주 간격, 3~10회",
  },
  {
    name: "미백·색소 솔루션",
    description:
      "기미·잡티 등 색소 원인별 맞춤 레이저 치료로 근본을 개선하고 맑은 피부톤을 되찾는 프로그램",
    time: "약 15~30분",
    recovery: "즉시 생활 가능 (리팟 제외)",
    cycle: "2~4주 간격, 3~10회",
  },
  {
    name: "모공·흉터 솔루션",
    description:
      "박피·재생·볼륨 회복을 아우르며 원인과 깊이에 맞춘 레이저·주사 복합 치료 프로그램",
    time: "약 20~40분",
    recovery: "즉시 생활 가능",
    cycle: "2~4주 간격, 4~6회",
  },
  {
    name: "레이저 제모 솔루션",
    description:
      "피부 타입별 맞춤 레이저로 모낭을 선택적으로 파괴하여 매끄러움을 선사하는 제모 프로그램",
    time: "약 5~10분",
    recovery: "즉시 생활 가능",
    cycle: "4주 간격, 5회 이상",
  },
  {
    name: "여드름·트러블 솔루션",
    description:
      "개인별 여드름 원인과 단계별 분석을 통해 레이저를 조합한 맞춤형 치료 프로그램",
    time: "약 20~40분",
    recovery: "즉시 생활 가능",
    cycle: "2~4주 간격, 3~10회",
  },
];

export default function SkinResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const navigationResult = window.history.state?.usr?.result;

        if (navigationResult) {
          setResult(navigationResult?.data ?? navigationResult ?? null);
          setLoading(false);
          return;
        }

        const data = await getSkinResult();
        setResult(data?.data ?? data ?? null);
      } catch (error) {
        console.error("Failed to fetch skin result", error);
        setResult(null);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#f3f4f2] text-[0.95rem] text-[#2A2A2A]">
        피부 결과를 불러오는 중입니다...
      </div>
    );
  }

  const cosmetic = result?.cosmetic ?? {};
  const routines = result?.routines ?? {};
  const recommendedFromApi = Array.isArray(cosmetic.recommended)
    ? cosmetic.recommended
    : [];

  const ingredientCards = recommendedFromApi.length
    ? recommendedFromApi.map((item) => ({
        name: item.ingredient || "성분",
        effect: item.effect || "효과 정보 준비 중",
        caution: item.cautions?.[0] || "주의사항 정보 준비 중",
        products: normalizeProducts(item.products),
      }))
    : defaultIngredients;

  const treatmentCards =
    Array.isArray(result?.treatments) && result.treatments.length
      ? result.treatments
      : defaultTreatments;

  const scoreSummary =
    cosmetic.summary || "피지점수가 10점 중 8점으로 높게 나타났어요";

  const cleaningText =
    routines.type_description ||
    "세안 후 1~2시간만 지나도\nT존이 번들거리는 타입입니다";

  const cleansingGuide =
    Array.isArray(routines.cleansing?.guide) && routines.cleansing.guide.length
      ? routines.cleansing.guide.join("\n")
      : "기름은 기름으로 녹여야 합니다\n피지를 100% 없애려 하지 마세요";

  const basicSteps =
    Array.isArray(routines.skincare_order?.basic_steps) &&
    routines.skincare_order.basic_steps.length
      ? routines.skincare_order.basic_steps.join(" → ")
      : "세안 → 토너 → 세럼 → 크림 → 선크림";

  const applicationRules =
    Array.isArray(routines.skincare_order?.application_rules) &&
    routines.skincare_order.application_rules.length
      ? routines.skincare_order.application_rules.join(" / ")
      : "묽은 것부터 바릅니다";

  return (
    <div
      style={{
        background: "#f3f4f2",
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="px-4 pb-24">
        <section className="mb-6 mt-7">
          <h1
            style={{
              fontWeight: 900,
              fontSize: 24,
              color: "#111",
              marginBottom: 4,
            }}
          >
            화장품 성분 추천
          </h1>
          <p className="mb-4 text-sm text-gray-500">{scoreSummary}</p>
          {ingredientCards.map((ingredient) => (
            <IngredientCard key={ingredient.name} {...ingredient} />
          ))}
        </section>

        <section className="mb-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              {cleaningText}
            </p>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: GREEN,
                marginBottom: 6,
              }}
            >
              클렌징 가이드
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-gray-700">
              {cleansingGuide}
            </p>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: GREEN,
                marginBottom: 8,
              }}
            >
              스킨케어 순서
            </h3>
            <p className="mb-1 text-sm font-semibold text-gray-800">
              {basicSteps}
            </p>
            <p className="text-xs text-gray-400">（{applicationRules}）</p>
          </div>
        </section>

        <section className="mb-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2
              style={{
                fontWeight: 900,
                fontSize: 26,
                color: "#111",
                marginBottom: 6,
              }}
            >
              수면 권장 시간
            </h2>
            <p className="text-sm text-gray-600">
              권장 수면 시간 : {result?.sleepRecommendation || "7-9시간"}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2
            style={{
              fontWeight: 900,
              fontSize: 26,
              color: "#111",
              marginBottom: 12,
            }}
          >
            시술 추천
          </h2>
          {treatmentCards.map((treatment) => (
            <TreatmentCard key={treatment.name} {...treatment} />
          ))}
        </section>

        <section className="mb-2">
          <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <h2
              style={{
                fontWeight: 900,
                fontSize: 24,
                color: "#111",
                marginBottom: 8,
              }}
            >
              시술 상담
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              전문 피부과 전문의와 현재 피부 상태에 대해
              <br />
              자세히 논의해보세요
            </p>
            <button
              style={{
                background: "#b5a842",
                color: "white",
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 999,
                padding: "14px 0",
                width: "100%",
                border: "none",
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              DERNA 홈페이지
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
