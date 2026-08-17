import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EndOverlay from "../components/ddayend/EndOverlay";
import QuestionStep from "../components/ddayend/QuestionStep";
import DiagnosisStep from "../components/ddayend/DiagnosisStep";
import LoadingStep from "../components/ddayend/LoadingStep";
import ResultSummary from "../components/ddayend/ResultSummary";
import { getOnboarding } from "../api/onboarding";
import { finishPlan } from "../api/plan";
import { getProgress } from "../api/todo";

// ⚠️ 2026.08 기준으로 확인한 내용: 온보딩/피부결과/투두 어느 응답에도 항목별
// (피지량/댕김/여드름/붉은기) "before 점수"가 아직 내려오지 않습니다. 실제 응답을
// 재귀적으로 다 뒤져봤지만 숫자 필드 자체가 없어요. 그래서 슬라이더에서 평가할 항목과
// 시작 점수는 백엔드에 필드가 추가되기 전까지 아래 값으로 임시 고정합니다.
// TODO: 백엔드에 항목별 before 점수 필드 추가되면 이 두 값을 실제 값으로 교체하세요.
const FALLBACK_SCORE_KEY = "피지량";
const FALLBACK_BEFORE_SCORE = 5;

function totalDaysBetween(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  return Math.max(Math.round((end - start) / 86400000), 0);
}

export default function DDayEnd() {
  const navigate = useNavigate();
  const [step, setStep] = useState("overlay");
  const [purpose, setPurpose] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [todoStats, setTodoStats] = useState({
    cleansingRate: 0,
    skincareRate: 0,
    totalRate: 0,
  });
  const [result, setResult] = useState(null);

  // 이번 여정 요약(목적/총 기간)과 체크리스트 진행률은 실제 데이터로 미리 받아둡니다.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const onboarding = await getOnboarding();
        if (cancelled || !onboarding) return;
        setPurpose(onboarding.purpose ?? "");
        setTotalDays(totalDaysBetween(onboarding.createdAt, onboarding.goalDate));
      } catch {
        // 실패해도 화면은 그대로 진행합니다.
      }
    })();

    (async () => {
      try {
        const progress = await getProgress();
        if (cancelled || !progress) return;
        const cleansingRate = progress.cleansingRate ?? 0;
        const skincareRate = progress.skincareRate ?? 0;
        setTodoStats({
          cleansingRate,
          skincareRate,
          totalRate: Math.round((cleansingRate + skincareRate) / 2),
        });
      } catch {
        // 실패해도 0%로 유지합니다.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // 결과 화면으로 넘어갈 준비(로딩 애니메이션 + 실제 API 응답)가 둘 다 끝나면 이동합니다.
  useEffect(() => {
    if (step === "loading" && result) {
      const timer = setTimeout(() => setStep("result"), 300);
      return () => clearTimeout(timer);
    }
  }, [step, result]);

  async function handleDiagnosisSubmit(afterScoreValue) {
    setStep("loading");
    try {
      // POST /api/plan/finish → AI가 리포트를 생성해서 바로 돌려줍니다.
      const real = await finishPlan({
        afterScoreKey: FALLBACK_SCORE_KEY,
        afterScoreValue,
      });
      setResult(real);
    } catch {
      // 리포트 생성 실패 시에도 화면이 멈추지 않도록 최소한의 결과로 채웁니다.
      setResult({
        afterScoreKey: FALLBACK_SCORE_KEY,
        afterScoreValue,
        journeySummary: "",
        improvementPoints: "",
        recommendationNext: "",
        todoCompletionRate: todoStats.totalRate,
      });
    }
  }

  function handleRestart() {
    setStep("overlay");
    setResult(null);
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
        <QuestionStep totalDays={totalDays} onNext={() => setStep("diagnosis")} />
      )}

      {step === "diagnosis" && (
        <DiagnosisStep
          scoreKey={FALLBACK_SCORE_KEY}
          beforeScore={FALLBACK_BEFORE_SCORE}
          onSubmit={handleDiagnosisSubmit}
        />
      )}

      {step === "loading" && <LoadingStep />}

      {step === "result" && result && (
        <ResultSummary
          journey={{
            purpose,
            totalDays,
            scoreKey: result.afterScoreKey || FALLBACK_SCORE_KEY,
            beforeScore: FALLBACK_BEFORE_SCORE,
            afterScore: result.afterScoreValue,
            todoStats,
            improvementPoints: result.improvementPoints,
            recommendationNext: result.recommendationNext,
          }}
          onRestart={handleRestart}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}
