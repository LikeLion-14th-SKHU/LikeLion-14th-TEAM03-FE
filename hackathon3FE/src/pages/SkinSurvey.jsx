import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSkinResult } from "../api/skinResult";
import { saveOnboarding } from "../api/onboarding";
import miniLogo from "../assets/img/logo/MiniLogo.svg";
import leaf from "../assets/img/icon/leaf.svg";
import SurveyQuestion from "../components/SurveyQuestion";
import CompletionLoading from "../components/CompletionLoading";
import {
  SKIN_SURVEY_TOTAL,
  skinSurveyQuestions,
} from "../data/skinSurveyQuestions";
import {
  buildOnboardingPayload,
  persistOnboardingWeights,
} from "../utils/onboardingSurvey";

export default function SkinSurvey() {
  const location = useLocation();
  const navigate = useNavigate();
  const onboardingState = location.state || {};
  const nickname = onboardingState.nickname?.trim() || "OO";
  const profile = onboardingState.profile || {
    nickname,
    age: 20,
    gender: "male",
  };
  const purpose = onboardingState.purpose || "";
  const goalDate = onboardingState.goalDate || "";
  const [stage, setStage] = useState("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [concernText, setConcernText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = skinSurveyQuestions[questionIndex];

  const selectAnswer = (optionId) => {
    if (currentQuestion.id === "H1") {
      const noneOptionId = "h1-6";

      if (optionId === noneOptionId) {
        const nextAnswers = {
          ...answers,
          [currentQuestion.id]: [noneOptionId],
        };

        setAnswers(nextAnswers);
        persistOnboardingWeights(nextAnswers);
        return;
      }

      const existingSelected = answers[currentQuestion.id] || [];
      const filteredSelected = existingSelected.filter(
        (id) => id !== noneOptionId,
      );
      const isAlreadySelected = filteredSelected.includes(optionId);
      const nextSelected = isAlreadySelected
        ? filteredSelected.filter((id) => id !== optionId)
        : [...filteredSelected, optionId];

      const nextAnswers = {
        ...answers,
        [currentQuestion.id]: nextSelected,
      };

      setAnswers(nextAnswers);
      persistOnboardingWeights(nextAnswers);
      return;
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: currentQuestion.multiple
        ? answers[currentQuestion.id]?.includes(optionId)
          ? answers[currentQuestion.id].filter((id) => id !== optionId)
          : [...(answers[currentQuestion.id] || []), optionId]
        : optionId,
    };

    setAnswers(nextAnswers);
    persistOnboardingWeights(nextAnswers);
  };

  const goToPreviousQuestion = () => {
    if (questionIndex === 0) {
      setStage("guidance");
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex - 1);
  };

  const goToNextQuestion = () => {
    const currentAnswer = answers[currentQuestion.id];
    const hasAnswer = Array.isArray(currentAnswer)
      ? currentAnswer.length > 0
      : currentAnswer !== undefined &&
        currentAnswer !== null &&
        currentAnswer !== "";

    if (!hasAnswer) {
      window.alert("응답해주세요.");
      return;
    }

    if (questionIndex < skinSurveyQuestions.length - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setStage("concern");
  };

  const handleSurveyComplete = async () => {
    if (isSubmitting) return;

    const payload = buildOnboardingPayload({
      profile,
      purpose,
      goalDate,
      answers,
      concernRaw: concernText,
    });

    persistOnboardingWeights(answers);
    setIsSubmitting(true);

    try {
      console.log("onboarding payload", payload);
      const saved = await saveOnboarding(payload);
      console.log("onboarding saved", saved);

      const skinResult = await getSkinResult();
      console.log("skin result fetched", skinResult);

      if (!skinResult) {
        window.alert(
          "결과 생성이 아직 완료되지 않았습니다. 잠시 후 다시 시도해주세요.",
        );
        // isSubmitting = true 상태 유지 (중복 호출 방지)
        // 사용자가 다시 시도해야 하므로 버튼은 비활성화된 상태로 유지
        return;
      }

      navigate("/skin-result", {
        replace: true,
        state: {
          answers,
          payload,
          onboarding: saved,
          result: skinResult?.data ?? skinResult ?? null,
        },
      });
    } catch (error) {
      console.error("Failed to save onboarding", error);
      console.error("status:", error.response?.status);
      console.error("response:", error.response?.data);

      window.alert("설문 저장에 실패했습니다. 다시 시도해주세요.");

      // 3초 후 버튼 다시 활성화
      setTimeout(() => {
        setIsSubmitting(false);
      }, 3000);
      return;
    }
  };

  if (stage === "concern") {
    return (
      <section className="relative flex flex-1 animate-[profileIn_500ms_ease-out_both] flex-col bg-white px-6 pb-8 pt-5">
        <img src={miniLogo} alt="오뷰" className="h-7 w-auto self-start" />

        <div className="flex flex-1 flex-col justify-center">
          <p className="m-0 text-center text-[18px] leading-[1.5] text-[#2a2a2a]">
            마지막으로,
            <br />
            <span className="font-semibold text-[#285E3C]">
              피부 고민이 있다면
            </span>
            <br />
            자유롭게 서술해주세요.
          </p>

          <textarea
            value={concernText}
            onChange={(event) => setConcernText(event.target.value)}
            placeholder="예: 여드름이 자주 올라오고, 피부가 쉽게 당겨요."
            className="mt-10 h-[200px] w-full resize-none rounded-[16px] border border-[#285E3C]/20 bg-[#F7F7F7] p-4 text-[16px] text-[#2a2a2a] outline-none transition-all duration-200 placeholder:text-[#999] focus:border-[#285E3C] focus:ring-2 focus:ring-[#285E3C]/15"
          />
        </div>

        <div className="absolute inset-x-0 bottom-[3%] z-50 h-[40px] w-full">
          <button
            type="button"
            onClick={() => setStage("survey")}
            className="absolute top-0 h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#2a2a2a] text-[17px] font-medium text-white outline-none transition-all duration-300 hover:bg-black active:scale-95"
            style={{ left: "5%", color: "#FFFFFF", backgroundColor: "#2a2a2a" }}
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleSurveyComplete}
            disabled={isSubmitting}
            className="absolute top-0 h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#285E3C] text-[17px] font-medium text-white outline-none transition-all duration-300 hover:bg-[#204C31] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            style={{ right: "5%", color: "#FFFFFF" }}
          >
            완료
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-1 animate-[profileIn_500ms_ease-out_both] flex-col bg-white px-6 pb-8 pt-5">
      <img src={miniLogo} alt="오뷰" className="h-7 w-auto self-start" />

      {stage === "survey" ? (
        <SurveyQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={questionIndex + 1}
          totalQuestions={SKIN_SURVEY_TOTAL}
          selectedOption={answers[currentQuestion.id]}
          onSelect={selectAnswer}
          onPrevious={goToPreviousQuestion}
          onNext={goToNextQuestion}
          isLastQuestion={questionIndex === skinSurveyQuestions.length - 1}
        />
      ) : stage === "intro" ? (
        <div className="mt-[60%] animate-[profileIn_500ms_ease-out_both] text-center text-[#2a2a2a]">
          <p className="m-0 mb-[50px] text-[20px]">반가워요, {nickname} 님!</p>

          <div className="relative mt-12">
            <img
              src={leaf}
              alt=""
              aria-hidden="true"
              className="absolute left-2/5 top-[-30px] h-12 w-18 -translate-x-1/2 object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(31%) sepia(18%) saturate(1375%) hue-rotate(93deg) brightness(90%) contrast(91%)",
              }}
            />
            <p className="m-0 text-[19px] leading-[1.45]">
              <strong className="font-bold text-[#285E3C]">피부 타입</strong>을
              알아보기
              <br />
              위해 몇 가지 질문을 준비했어요.
            </p>
            <p className="m-0 mt-4 text-[14px] text-[#777]">
              문항은 총 18문항으로 약 2분정도 소요됩니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-[60%] animate-[profileIn_500ms_ease-out_both] px-4 text-center text-[18px] leading-[1.5] text-[#2a2a2a]">
          <p className="m-0">
            실제 한국인의 42.7%는 스스로를 지성이라
            <br />
            생각했지만, 전문가의 평가에서 지성은 겨우
            <br />
            7%에 달했다고 해요.
          </p>
          <p className="m-0" style={{ marginTop: "10%" }}>
            자기 자신에 대한 선입견을 배제할수록
            <br />
            정확한 추천을 받을 수 있어요.
          </p>
        </div>
      )}

      {stage !== "survey" && (
        <button
          type="button"
          style={{ color: "#FFFFFF" }}
          onClick={() => {
            if (stage === "intro") setStage("guidance");
            if (stage === "guidance") setStage("survey");
          }}
          className="absolute bottom-[3%] right-[7%] h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#285E3C] text-[17px] font-medium text-white outline-none transition-all duration-300 hover:bg-[#204C31] active:scale-95"
        >
          {stage === "intro" ? "다음" : "시작"}
        </button>
      )}
    </section>
  );
}
