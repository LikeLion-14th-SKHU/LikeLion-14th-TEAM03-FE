import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import miniLogo from "../assets/img/logo/MiniLogo.svg";
import leaf from "../assets/img/icon/leaf.svg";
import SurveyQuestion from "../components/SurveyQuestion";
import CompletionLoading from "../components/CompletionLoading";
import {
  SKIN_SURVEY_TOTAL,
  skinSurveyQuestions,
} from "../data/skinSurveyQuestions";

export default function SkinSurvey() {
  const location = useLocation();
  const navigate = useNavigate();
  const nickname = location.state?.nickname?.trim() || "OO";
  const [stage, setStage] = useState("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = skinSurveyQuestions[questionIndex];

  const selectAnswer = (optionId) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: currentQuestion.multiple
        ? currentAnswers[currentQuestion.id]?.includes(optionId)
          ? currentAnswers[currentQuestion.id].filter((id) => id !== optionId)
          : [...(currentAnswers[currentQuestion.id] || []), optionId]
        : optionId,
    }));
  };

  const goToPreviousQuestion = () => {
    if (questionIndex === 0) {
      setStage("guidance");
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex - 1);
  };

  const goToNextQuestion = () => {
    if (questionIndex < skinSurveyQuestions.length - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1);
      return;
    }
    // TODO: Swagger가 열리면 answers를 API로 전송합니다.
    setStage("loading");
  };

  if (stage === "loading") {
    return (
      <CompletionLoading
        onComplete={() => navigate("/skin-result", { state: { answers } })}
      />
    );
  }

  return (
    <section className="relative -mx-4 -my-6 flex flex-1 animate-[profileIn_500ms_ease-out_both] flex-col bg-white px-6 pb-8 pt-5">
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
              className="absolute left-2/5 top-[-38px] h-8 w-12 -translate-x-1/2 object-contain"
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
