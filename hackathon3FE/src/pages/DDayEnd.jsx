import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EndOverlay from "../components/ddayend/EndOverlay";
import WeekStrip from "../components/home/WeekStrip";
import DdayCard from "../components/home/DdayCard";
import QuestionStep from "../components/ddayend/QuestionStep";
import DiagnosisStep from "../components/ddayend/DiagnosisStep";
import LoadingStep from "../components/ddayend/LoadingStep";
import ResultSummary from "../components/ddayend/ResultSummary";
import { getOnboarding } from "../api/onboarding";
import { getBeforeScore, finishPlan } from "../api/plan";
import { getProgress } from "../api/todo";
import { buildWeekStrip } from "../utils/date";

// GET /api/plan/before-score가 실패했을 때만 쓰는 안전장치입니다.
// (온보딩 때 계산된 trouble_scores 중 MAX 항목을 백엔드가 대신 골라주므로
// 평소에는 이 값이 쓰일 일이 없습니다.)
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
  const [scoreKey, setScoreKey] = useState(FALLBACK_SCORE_KEY);
  const [beforeScore, setBeforeScore] = useState(FALLBACK_BEFORE_SCORE);
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

    // 슬라이더에 쓸 평가 항목(scoreKey)과 초기값(beforeScore)은
    // GET /api/plan/before-score가 온보딩 trouble_scores 중 MAX 항목으로 대신 골라줍니다.
    (async () => {
      try {
        const beforeScoreData = await getBeforeScore();
        if (cancelled || !beforeScoreData) return;
        const { afterScoreKey, beforeScoreValue } = beforeScoreData;
        if (!afterScoreKey || typeof beforeScoreValue !== "number") return;
        setScoreKey(afterScoreKey);
        setBeforeScore(beforeScoreValue);
      } catch {
        // 실패해도 fallback(피지량/5)으로 유지합니다.
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
      const real = await finishPlan({ afterScoreKey: scoreKey, afterScoreValue });
      setResult(real);
    } catch {
      // 리포트 생성 실패 시에도 화면이 멈추지 않도록 최소한의 결과로 채웁니다.
      setResult({
        afterScoreKey: scoreKey,
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

  // /d-dayend는 실제 D-Day가 0이 안 됐어도(테스트 시 서버 시간을 건너뛸 수 없으니)
  // 주소를 직접 쳐서 들어와도 항상 볼 수 있어야 해서, 홈 화면에 기대야 하는 대신
  // 이 페이지 자체에서 캘린더/D-Day 카드를 다시 그려서 오버레이 뒤에 보여줍니다.
  const weekStrip = buildWeekStrip(new Date());

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      {step === "overlay" && (
        <div className="relative flex min-h-full flex-1 flex-col gap-4 bg-[#E7E7E8] px-5 pt-4 pb-4">
          <WeekStrip days={weekStrip} />

          <div className="flex gap-2.5">
            <DdayCard purpose={purpose} dday={0} />
          </div>

          <EndOverlay onConfirm={() => setStep("question")} />
        </div>
      )}

      {step === "question" && (
        <QuestionStep totalDays={totalDays} onNext={() => setStep("diagnosis")} />
      )}

      {step === "diagnosis" && (
        <DiagnosisStep
          scoreKey={scoreKey}
          beforeScore={beforeScore}
          onSubmit={handleDiagnosisSubmit}
        />
      )}

      {step === "loading" && <LoadingStep isReady={!!result} />}

      {step === "result" && result && (
        <ResultSummary
          journey={{
            purpose,
            totalDays,
            scoreKey: result.afterScoreKey,
            beforeScore,
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
