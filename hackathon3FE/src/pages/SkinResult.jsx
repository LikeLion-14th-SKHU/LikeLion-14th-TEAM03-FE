import checkIcon from "../assets/img/icon/Check.svg";

const ingredientRecommendations = [
  {
    title: "나이아신아마이드",
    effect: "피지 조절, 항염 효과",
    caution: "고농도 사용 시 피부 자극이 있을 수 있으니 저농도부터 시작하세요.",
    products: ["토너", "세럼", "앰플", "크림"],
  },
  {
    title: "유분 생성 억제, 진정",
    effect: "유분 생성 억제, 진정",
    caution: "건조함을 유발할 수 있으니 보습제와 함께 사용하세요.",
    products: ["토너", "세럼", "크림"],
  },
];

function ResultLogo({ title = "화장품 성분 추천" }) {
  return (
    <div className="mb-4 flex items-center justify-start">
      <span
        className="text-[1.5rem] leading-none tracking-[-0.08em] text-[#2A2A2A]"
        style={{ fontWeight: 600 }}
      >
        {title}
      </span>
    </div>
  );
}

function DetailCard({ item }) {
  return (
    <div className="rounded-[16px] border border-[#e8e8e8] bg-[#f1f1f1] p-4 text-[#2A2A2A] shadow-none">
      <div className="mb-3 flex items-center gap-3">
        <img
          src={checkIcon}
          alt="check"
          className="block h-5 w-5 shrink-0"
          draggable={false}
        />
        <span className="text-[1.05rem] font-bold leading-relaxed text-[#2A2A2A]">
          {item.title}
        </span>
      </div>
      <div className="space-y-2 text-[0.98rem] leading-relaxed text-[#2A2A2A]">
        <p className="font-medium">효과: {item.effect}</p>
        <p className="font-medium text-[#2A2A2A]">주의: {item.caution}</p>
      </div>
    </div>
  );
}

function IngredientRecommendationCard({ item }) {
  return (
    // 수정 1: px-3 py-4 → p-4로 통일 + 바깥 화이트 박스와 구분되도록 배경/보더 추가
    // (이전엔 bg-[#ffffff]가 바깥 박스와 같아서 패딩을 줘도 경계가 안 보였음)
    <div className="rounded-[16px] border border-[#e8e8e8] bg-[#f9f9f9] p-4 shadow-none">
      <div className="space-y-4">
        <DetailCard item={item} />
      </div>

      <div className="mt-5 border-t border-[#d9d9d9] pt-4">
        <p className="mb-3 text-[0.95rem] font-semibold text-[#2A2A2A]">
          추천 제품 라인업
        </p>
        <div className="grid grid-cols-2 gap-3">
          {item.products.map((product) => (
            <div
              key={product}
              className="flex min-h-[70px] items-center justify-center rounded-[12px] bg-[#d9d9d9] text-[1.1rem] font-medium text-[#2A2A2A]"
            >
              {product}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkinResult() {
  return (
    <div className="result-scroll flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f5f5f5] px-3 pr-2">
      <div
        style={{ marginLeft: 10, marginRight: 4 }}
        className="space-y-5 pb-8 pt-1"
      >
        <div
          // 수정 2: 인라인 style의 padding: 20과 className의 p-4가 충돌해서
          // p-4는 죽은 코드였음 → className의 p-4 제거하고 style의 padding만 사용
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 30,
            padding: 20,
          }}
          className="rounded-[16px] bg-[#ffffff] shadow-none"
        >
          <ResultLogo />
          <p className="mb-4 text-[0.95rem] leading-relaxed text-[#2A2A2A]">
            피지점수가 10점 중 8점으로 높게 나타났어요
          </p>

          {/* 수정 3: 여기 p-4는 제거 (카드 자체가 아니라 wrapper를 눌러서
              IngredientRecommendationCard가 좁아 보이던 원인) */}
          <div className="space-y-4">
            {ingredientRecommendations.map((item) => (
              <IngredientRecommendationCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div
          style={{ marginLeft: 20, marginRight: 20, padding: 20 }}
          className="rounded-[10px] bg-[#f1f1f1] shadow-none"
        >
          <ResultLogo title="클렌징 가이드" />
          <div className="space-y-4 text-[#2A2A2A]">
            <div>
              <p className="text-[0.95rem] leading-[1.7]">
                세안 후 1~2시간만 지나도
                <br />
                T존이 번들거리는 타입입니다
              </p>
            </div>

            <div className="rounded-[12px] border border-[#e8e8e8] bg-[#f1f1f1] p-4">
              <p className="mb-2 text-[1.05rem] font-bold text-[#285E3C]">
                클렌징 가이드
              </p>
              <p className="text-[0.96rem] leading-[1.8] text-[#2A2A2A]">
                기름은 기름으로 녹여야 합니다
                <br />
                피지를 100% 없애려 하지 마세요
              </p>
            </div>

            <div className="rounded-[12px] border border-[#e8e8e8] bg-[#f1f1f1] p-4">
              <p className="mb-1 text-[1.05rem] font-bold text-[#285E3C]">
                스킨케어 순서
              </p>
              <p className="text-[0.96rem] leading-[1.8] text-[#2A2A2A]">
                세안 → 토너 → 세럼 → 크림 → 선크림
                <br />
                (물은 것부터 바릅니다)
              </p>
            </div>

            <div className="rounded-[12px] border border-[#e8e8e8] bg-[#f1f1f1] p-4">
              <p className="mb-1 text-[1.05rem] font-bold text-[#285E3C]">
                수면 권장 시간
              </p>
              <p className="text-[0.96rem] leading-[1.8] text-[#2A2A2A]">
                권장 수면 시간 : 7~9시간
              </p>
            </div>
          </div>
        </div>

        <div
          style={{ marginLeft: 20, marginRight: 20 }}
          className="rounded-[16px] bg-[#f1f1f1] p-4 shadow-none"
        >
          <ResultLogo title="시술 추천" />
          <div className="mb-3 space-y-2 border-b border-[#d9d9d9] pb-3 text-[#2A2A2A]">
            <p className="flex items-center gap-2 text-[0.95rem] font-medium">
              <span className="inline-flex h-4 w-4 items-center justify-center text-[0.8rem] text-[#285E3C]">
                🗓
              </span>
              회복 기간: 즉시 생활 가능
            </p>
            <p className="flex items-center gap-2 text-[0.95rem] font-medium">
              <span className="inline-flex h-4 w-4 items-center justify-center text-[0.8rem] text-[#285E3C]">
                🕒
              </span>
              권장 주기: 2~4주 간격, 3~10회
            </p>
          </div>

          <div className="space-y-4 text-[#2A2A2A]">
            {[
              {
                title: "홍조·혈관 솔루션",
                desc: "홍조 원인과 피부 상태 및 재발 가능성을 고려한 최적 레이저·고주파 조합 치료 프로그램",
              },
              {
                title: "미백·색소 솔루션",
                desc: "기미·잡티 등 색소 원인별 맞춤 레이저와 기미를 개선해 화이트닝 효과와 피부 톤 개선에 도움",
              },
              {
                title: "모공·홍조 솔루션",
                desc: "박피·재생·불림 효과를 아우르며 원인과 깊이에 맞춰 레이저와 고주파를 조합해 피부 결 개선",
              },
              {
                title: "레이저 제모 솔루션",
                desc: "피부 타입별 맞춤 레이저로 모낭을 선택적으로 파괴하여 매끈하고 깨끗한 피부 톤을 유지",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[12px] border border-[#e8e8e8] bg-[#f1f1f1] p-4"
              >
                <p className="mb-2 text-[1.2rem] font-bold text-[#285E3C]">
                  {item.title}
                </p>
                <p className="mb-3 text-[0.96rem] leading-[1.7] text-[#2A2A2A]">
                  {item.desc}
                </p>
                <div className="space-y-1 text-[0.96rem] text-[#2A2A2A]">
                  <p>⏱ 시술 시간: 약 15~30분</p>
                  <p>🩺 회복 기간: 즉시 생활 가능</p>
                  <p>⏳ 권장 주기: 2~4주 간격, 3~10회</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ marginLeft: 20, marginRight: 20 }}
          className="rounded-[16px] bg-[#f1f1f1] p-4 shadow-none"
        >
          <ResultLogo title="시술 상담" />
          <div className="rounded-[12px] border border-[#e8e8e8] bg-[#f1f1f1] p-4">
            <p className="mb-2 text-[1.2rem] font-bold text-[#285E3C]">
              시술 상담
            </p>
            <p className="mb-3 text-[0.96rem] leading-[1.7] text-[#2A2A2A]">
              전문 피부과 전문의와 현재 피부 상태에 대해 자세히 논의해보세요.
            </p>
            <button className="flex w-full items-center justify-center rounded-[12px] bg-[#285E3C] px-4 py-4 text-[1.1rem] font-bold text-white shadow-sm">
              DERNA 홈페이지
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
