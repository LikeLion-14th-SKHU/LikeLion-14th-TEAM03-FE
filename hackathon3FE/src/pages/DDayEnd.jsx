import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EndOverlay from "../components/ddayend/EndOverlay";
import QuestionStep from "../components/ddayend/QuestionStep";
import DiagnosisStep from "../components/ddayend/DiagnosisStep";
import LoadingStep from "../components/ddayend/LoadingStep";
import ResultSummary from "../components/ddayend/ResultSummary";

// ⚠️ 임시: 스웨거 문서(POST /api/plan/finish, GET /api/plan/result) 응답 형태를
// 참고해서 만든 목데이터입니다. 아직 백엔드 연동은 하지 않고 UI 흐름만 구현했어요.
// 이 페이지(/d-dayend)는 그 자체로 완결된 흐름이라, 홈 화면 쪽은 건드리지 않았습니다.
// 나중에 홈에서 D-Day 종료를 감지해 이 페이지로 이동시키는 부분만 연결해주면 됩니다.
const MOCK_JOURNEY = {
  purpose: "오사카 여행",
  totalDays: 26,
  scoreKey: "피지량",
  beforeScore: 8,
  todoStats: { cleansingRate: 80, skincareRate: 70, totalRate: 73 },
  goodPoints: ["세안 루틴을 22일 지키셨어요"],
  recommendationNext: "이제 레티놀을 천천히 시작해보셔도 좋아요",
};

export default function DDayEnd() {
  const navigate = useNavigate();
  const [step, setStep] = useState("overlay");
  const [afterScore, setAfterScore] = useState(null);

  function handleDiagnosisSubmit(value) {
    setAfterScore(value);
    setStep("loading");
  }

  function handleRestart() {
    setStep("overlay");
    setAfterScore(null);
    navigate("/onboarding");
  }

  function handleFinish() {
    navigate("/");
  }

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      {step === "overlay" && (
        <EndOverlay onConfirm={() => setStep("question")} />
      )}

      {step === "question" && (
        <QuestionStep
          totalDays={MOCK_JOURNEY.totalDays}
          onNext={() => setStep("diagnosis")}
        />
      )}

      {step === "diagnosis" && (
        <DiagnosisStep
          scoreKey={MOCK_JOURNEY.scoreKey}
          beforeScore={MOCK_JOURNEY.beforeScore}
          onSubmit={handleDiagnosisSubmit}
        />
      )}

      {step === "loading" && (
        <LoadingStep onDone={() => setStep("result")} />
      )}

      {step === "result" && (
        <ResultSummary
          journey={{
            ...MOCK_JOURNEY,
            afterScore: afterScore ?? MOCK_JOURNEY.beforeScore,
          }}
          onRestart={handleRestart}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}
