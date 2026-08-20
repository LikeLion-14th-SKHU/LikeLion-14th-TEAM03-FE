import { useEffect, useState } from "react";
import { getSkinResult } from "../api/skinResult";
import resultPage1Image from "../assets/img/icon/ResultPage1.png";
import serumImage from "../assets/img/icon/세럼 이미지.png";
import ampouleImage from "../assets/img/icon/앰플 이미지.png";
import creamImage from "../assets/img/icon/크림 이미지.png";
import tonerImage from "../assets/img/icon/토너 이미지.png";

const GREEN = "#2d6a4a";

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

/**
 * recommended[].products가
 * ["TON008", "SER007"] 같은 product_id 배열이라고 가정
 */
function normalizeProducts(products = []) {
  if (!Array.isArray(products)) return [];

  return products
    .map((product) => {
      // 혹시 백엔드가 product 객체를 보내는 경우도 대응
      if (typeof product === "string") {
        return product;
      }

      return product?.product_id;
    })
    .filter(Boolean);
}

function getProductImage(productId, product) {
  const productText = [
    productId,
    product?.name,
    product?.type,
    product?.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (productText.includes("ton") || productText.includes("토너")) {
    return tonerImage;
  }

  if (productText.includes("ser") || productText.includes("세럼")) {
    return serumImage;
  }

  if (
    productText.includes("amp") ||
    productText.includes("앰플") ||
    productText.includes("엠플")
  ) {
    return ampouleImage;
  }

  if (productText.includes("cre") || productText.includes("크림")) {
    return creamImage;
  }

  return null;
}

function SolutionIcon({ name }) {
  const iconProps = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name.includes("홍조")) {
    return (
      <svg {...iconProps}>
        <path d="M5 13c3-3 5 3 8 0s5 3 8 0 4 1 6-1" />
        <path d="M5 19c3-3 5 3 8 0s5 3 8 0 4 1 6-1" />
        <path d="M5 25c3-3 5 3 8 0s5 3 8 0 4 1 6-1" />
      </svg>
    );
  }

  if (name.includes("미백")) {
    return (
      <svg {...iconProps}>
        <path d="M9 24c-1-8 3-13 12-16 1 8-3 13-12 16Z" />
        <path d="M9 24c3-5 6-9 11-13" />
        <path d="m24 6 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
      </svg>
    );
  }

  if (name.includes("모공")) {
    return (
      <svg {...iconProps}>
        <path d="m16 4 2.2 7.8L26 14l-7.8 2.2L16 24l-2.2-7.8L6 14l7.8-2.2L16 4Z" />
        <path d="m26 21 .9 3.1L30 25l-3.1.9L26 29l-.9-3.1L22 25l3.1-.9L26 21Z" />
      </svg>
    );
  }

  if (name.includes("제모")) {
    return (
      <svg {...iconProps}>
        <path d="m10 23 12-12" />
        <path d="m8 25 2-2 2 2-2 2-2-2Z" />
        <path d="m20 11 2-2 3 3-2 2" />
        <path d="M22 6h5M24.5 3.5v5" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M16 27s-8-5.2-8-12a4.7 4.7 0 0 1 8-3.3A4.7 4.7 0 0 1 24 15c0 6.8-8 12-8 12Z" />
      <path d="M16 8V4M13 6h6" />
    </svg>
  );
}

function IngredientCard({ name, effect, caution, products, productsDetail }) {
  return (
    <div className="mb-3 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <CheckIcon />

        <span
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: GREEN,
          }}
        >
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

      {products.length > 0 && (
        <div className="mt-4">
          <p className="mb-3 text-xs text-gray-500">추천 제품 라인업</p>

          <div className="grid grid-cols-2 gap-2">
            {products.map((productId) => {
              const matchedProduct = productsDetail?.find(
                (product) => product.product_id === productId,
              );

              return (
                <div
                  key={productId}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {getProductImage(productId, matchedProduct) && (
                      <img
                        src={getProductImage(productId, matchedProduct)}
                        alt={matchedProduct?.name || productId}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>

                  <span className="text-center text-xs text-gray-600">
                    {matchedProduct?.name || productId}
                  </span>
                </div>
              );
            })}
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
        className="mb-1.5 flex items-center gap-2"
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: GREEN,
        }}
      >
        <SolutionIcon name={name} />
        {name}
      </p>

      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        {description}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
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

        /**
         * 이전 페이지에서 결과를 전달받은 경우
         */
        if (navigationResult) {
          setResult(navigationResult?.data ?? navigationResult ?? null);
          return;
        }

        /**
         * 전달받은 데이터가 없으면 API 호출
         */
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

  /**
   * API 데이터
   */
  const cosmetic = result?.cosmetic ?? {};
  const routines = result?.routines ?? {};

  /**
   * AI 추천 성분
   *
   * AI가 1개를 보내면 1개
   * 2개를 보내면 2개
   * 3개를 보내면 3개
   */
  const recommendedFromApi = Array.isArray(cosmetic.recommended)
    ? cosmetic.recommended
    : [];

  const ingredientCards = recommendedFromApi.map((item) => ({
    name: item?.ingredient || "성분",

    effect: item?.effect || "효과 정보 준비 중",

    caution:
      Array.isArray(item?.cautions) && item.cautions.length > 0
        ? item.cautions[0]
        : "주의사항 정보 준비 중",

    products: normalizeProducts(item?.products),
  }));

  /**
   * 시술 추천
   */
  const treatmentCards =
    Array.isArray(result?.treatments) && result.treatments.length > 0
      ? result.treatments
      : defaultTreatments;

  /**
   * cosmetic.summary가
   * 문자열 또는 객체로 들어오는 경우 모두 처리
   */
  const scoreSummaryRaw =
    typeof cosmetic.summary === "string"
      ? cosmetic.summary
      : cosmetic.summary?.summary || "피부 상태를 분석한 맞춤 추천 결과입니다.";

  const scoreSummary = scoreSummaryRaw.replace(/\.\s*/g, ".\n");

  /**
   * 루틴
   */
  const cleaningText =
    routines.type_description ||
    "세안 후 1~2시간만 지나도\nT존이 번들거리는 타입입니다";

  const cleansingGuide =
    Array.isArray(routines.cleansing?.guide) &&
    routines.cleansing.guide.length > 0
      ? routines.cleansing.guide.join("\n")
      : "기름은 기름으로 녹여야 합니다\n피지를 100% 없애려 하지 마세요";

  const basicSteps =
    Array.isArray(routines.skincare_order?.basic_steps) &&
    routines.skincare_order.basic_steps.length > 0
      ? routines.skincare_order.basic_steps.join(" → ")
      : "세안 → 토너 → 세럼 → 크림 → 선크림";

  const applicationRules =
    Array.isArray(routines.skincare_order?.application_rules) &&
    routines.skincare_order.application_rules.length > 0
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
        {/* 화장품 성분 추천 */}
        <section className="mb-6 mt-7 ">
          <div className="relative mb-4 rounded-2xl">
            <img
              src={resultPage1Image}
              alt=""
              className="block h-auto w-full"
            />

            <div className="absolute left-5 top-7 w-[68%]">
              <h1 className="mb-4 text-2xl font-black text-[#111]">
                화장품 성분 추천
              </h1>

              <div className="text-sm leading-relaxed text-gray-800">
                {scoreSummaryRaw
                  .split(/(?<=\.)\s*/)
                  .filter(Boolean)
                  .map((sentence, index) => (
                    <p key={index} className="mb-1.5 last:mb-0">
                      {sentence}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {ingredientCards.length > 0 ? (
            ingredientCards.map((ingredient) => (
              <IngredientCard
                key={ingredient.name}
                {...ingredient}
                productsDetail={result?.productsDetail ?? []}
              />
            ))
          ) : (
            <div className="rounded-2xl bg-white p-5 text-sm text-gray-500 shadow-sm">
              추천 성분 정보가 없습니다.
            </div>
          )}
        </section>

        {/* 피부 관리 루틴 */}
        <section className="mb-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-5 rounded-xl border border-[#2d6a4a]/20 bg-[#2d6a4a]/5 px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold text-[#2d6a4a]">
                  Skin Guide
                </span>
              </div>

              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {cleaningText}
              </p>
            </div>

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

            <p className="mb-5 whitespace-pre-line text-sm leading-relaxed text-gray-900">
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
          </div>
        </section>

        {/* 수면 권장 시간 */}
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

        {/* 시술 추천 */}
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

        {/* 시술 상담 */}
        <section className="mb-2">
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <div className="relative bg-[#fff36b] px-5 pb-5 pt-5">
              <div className="relative z-10 pr-[40%]">
                <p className="mb-1 text-[18px] font-bold text-[#263238]">
                  시술 상담은
                </p>

                <a
                  href="https://dernaclinic.com/ko"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[52px] font-black leading-[0.95] tracking-[-2px] text-[#343434] no-underline"
                >
                  DERNA
                </a>

                <p className="absolute left-[calc(50%+8px)] top-14 whitespace-nowrap text-[16px] font-bold text-[#263238]">
                  와 함께
                </p>

                <p className="mt-3 text-[12px] leading-relaxed text-[#454545]">
                  전문 피부과 의료진이
                  <br />
                  현재 피부 상태에 맞는 시술을 제안해드려요.
                </p>
              </div>

              <svg
                aria-hidden="true"
                className="absolute right-5 top-6 h-36 w-30 text-[#3d4147]"
                viewBox="0 0 120 150"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 96h76M31 96V42h58v54M48 42V24h24v18M42 61h10M68 61h10M52 96V76h16v20" />
                <circle cx="60" cy="22" r="17" fill="#fff36b" />
                <path d="M60 14v16M52 22h16" />
              </svg>

              <a
                href="https://dernaclinic.com/ko"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 mt-4 flex items-center justify-between rounded-[10px] bg-[#454545] px-5 py-3 text-[16px] font-bold text-[#fff36b] no-underline"
              >
                <span>DERNA 상담 바로가기</span>
                <span aria-hidden="true" className="text-[27px] leading-none">
                  ›
                </span>
              </a>
            </div>

            <div className="flex items-center gap-3 bg-[#fffbd0] px-5 py-3">
              <svg
                aria-hidden="true"
                className="h-8 w-8 shrink-0 text-[#4a4d4d]"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m16 3 11 5v8c0 6.5-4.6 10.8-11 13-6.4-2.2-11-6.5-11-13V8l11-5Z" />
                <path d="m10.5 16 3.5 3.5 7.5-8" />
              </svg>

              <p className="text-[10px] leading-relaxed text-[#555]">
                DERNA는 피부과 전문 의료기관으로,
                <br />
                안전하고 체계적인 진료를 제공합니다.
              </p>

              <a
                href="https://dernaclinic.com/ko"
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-right no-underline"
              >
                <strong className="block text-[20px] mt-3 font-bold leading-none tracking-[3px] text-[#5a5a5a]">
                  DERNA
                </strong>
                <span className="text-[8px] text-[#5a5a5a]">
                  Dernatology Clinic
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
