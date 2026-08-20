import { useState } from "react";

export default function SurveyQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelect,
  onPrevious,
  onNext,
}) {
  const isMultiple = question.multiple;
  const [isLeaving, setIsLeaving] = useState(false);

  const moveToNext = (selectedAnswer) => {
    setIsLeaving(true);

    setTimeout(() => {
      onNext(selectedAnswer);
    }, 250);
  };

  return (
    <div
      className={`
        flex min-h-0 flex-1 flex-col overflow-hidden
        transition-all duration-300 ease-out
        ${isLeaving ? "-translate-x-3 opacity-0" : "translate-x-0 opacity-100"}
      `}
    >
      <p className="relative m-0 mt-[40px] shrink-0 text-center text-[16px] font-medium text-[#2a2a2a]">
        <button
          type="button"
          aria-label="이전 질문"
          onClick={onPrevious}
          className="absolute left-0 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-0 text-[#2a2a2a] outline-none"
        >
          <svg
            aria-hidden="true"
            width="17"
            height="17"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m13 5-6 5 6 5" />
          </svg>
        </button>
        <span className="text-[#285E3C]">{questionNumber}</span>/
        {totalQuestions}
      </p>

      <h1
        className="m-0 mt-[48px] shrink-0 text-center text-[19px] leading-[1.45] text-[#2a2a2a]"
        style={{ fontWeight: 350 }}
      >
        {question.question.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      <div
        className="mx-auto mt-[42px] flex min-h-0 w-[75%] flex-1 flex-col overflow-y-auto pb-[32px]"
        style={{
          rowGap: "20px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {question.options.map((option) => {
          const isSelected = Array.isArray(selectedOption)
            ? selectedOption.includes(option.id)
            : selectedOption === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                const nextSelectedOption = onSelect(option.id);

                if (!isMultiple) {
                  setTimeout(() => {
                    moveToNext(nextSelectedOption);
                  }, 150);
                }
              }}
              style={{
                minHeight: "65px",
                flexShrink: 0,
                backgroundColor: isSelected ? "#E8F1EB" : "#FFFFFF",
                borderColor: "#285E3C",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              className={`
                w-full cursor-pointer rounded-[10px] px-4
                text-[18px] text-[#2a2a2a] outline-none
                transition-all duration-300 ease-out

                hover:bg-[#F4F8F5]
                hover:shadow-[0_4px_12px_rgba(40,94,60,0.10)]

                active:bg-[#E8F1EB]

                ${isSelected ? "shadow-[0_4px_12px_rgba(40,94,60,0.12)]" : ""}
              `}
            >
              <span
                className={`inline-block transition-colors duration-300 ${
                  isSelected ? "font-medium text-[#285E3C]" : ""
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {isMultiple && (
        <button
          type="button"
          onClick={() => moveToNext(selectedOption)}
          className="absolute bottom-[24px] right-[24px] h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#285E3C] text-[17px] font-medium text-white"
        >
          다음
        </button>
      )}
    </div>
  );
}
