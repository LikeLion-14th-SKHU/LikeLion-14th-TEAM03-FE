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
  const [isMoving, setIsMoving] = useState(false);

  const moveToNext = (selectedAnswer) => {
    if (isMoving) return;

    setIsMoving(true);
    setIsLeaving(true);

    setTimeout(() => {
      onNext(selectedAnswer);
    }, 250);
  };

  const handlePrevious = () => {
    if (isMoving) return;

    setIsMoving(true);
    setIsLeaving(true);

    setTimeout(() => {
      onPrevious();
    }, 250);
  };

  return (
    <div
      className={`
        flex min-h-0 flex-1 flex-col overflow-hidden
        transition-[opacity,transform]
        duration-300
        ease-out
        ${
          isLeaving
            ? "translate-y-[4px] opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      {/* 질문 번호 + 이전 버튼 */}
      <p className="relative m-0 mt-[40px] shrink-0 text-center text-[16px] font-medium text-[#2a2a2a]">
        <button
          type="button"
          aria-label="이전 질문"
          onClick={handlePrevious}
          className="
            absolute left-0 top-1/2
            flex h-8 w-8
            -translate-y-1/2
            cursor-pointer
            items-center justify-center
            border-none bg-transparent p-0
            text-[#2a2a2a]
            outline-none
            transition-colors duration-200
            hover:text-[#285E3C]
          "
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

        <span className="text-[#285E3C]">{questionNumber}</span>
        <span>/</span>
        {totalQuestions}
      </p>

      {/* 질문 */}
      <h1
        className="
          m-0 mt-[48px] shrink-0
          text-center text-[19px]
          leading-[1.45]
          text-[#2a2a2a]
        "
        style={{ fontWeight: 350 }}
      >
        {question.question.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      {/* 선지 + 복수선택 다음 버튼 */}
      <div className="mx-auto mt-[56px] flex min-h-0 w-[75%] flex-col">
        {/* 선지 스크롤 영역 */}
        <div
          className="flex flex-col overflow-y-auto pr-[2px]"
          style={{
            gap: "20px",

            // 65px 버튼 4개 + 20px 간격 3개
            maxHeight: "360px",

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
                disabled={isMoving}
                onClick={() => {
                  if (isMoving) return;

                  const nextSelectedOption = onSelect(option.id);

                  // 단일 선택은 선택 효과를 잠깐 보여준 뒤 이동
                  if (!isMultiple) {
                    setTimeout(() => {
                      moveToNext(nextSelectedOption);
                    }, 150);
                  }
                }}
                style={{
                  minHeight: "65px",
                  flexShrink: 0,
                  borderColor: "#285E3C",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                className={`
                  w-full
                  cursor-pointer
                  rounded-[10px]
                  px-4
                  text-[18px]
                  outline-none

                  transition-[background-color,box-shadow,border-color]
                  duration-300
                  ease-out

                  ${
                    isSelected
                      ? "bg-[#E8F1EB] shadow-[0_3px_10px_rgba(40,94,60,0.10)]"
                      : "bg-white hover:bg-[#F4F8F5] hover:shadow-[0_3px_10px_rgba(40,94,60,0.08)]"
                  }

                  disabled:cursor-default
                `}
              >
                <span
                  className={`
                    inline-block
                    transition-colors
                    duration-300
                    ${
                      isSelected
                        ? "font-medium text-[#285E3C]"
                        : "text-[#2a2a2a]"
                    }
                  `}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 복수 선택 질문에서만 표시 */}
        {isMultiple && (
          <div className="mt-[22px] flex shrink-0 justify-end">
            <button
              type="button"
              disabled={isMoving}
              onClick={() => moveToNext(selectedOption)}
              className="
                h-[40px] w-[88px]
                cursor-pointer
                rounded-[8px]
                border-none
                bg-[#285E3C]
                text-[17px]
                font-medium
                text-white
                outline-none

                transition-colors
                duration-300

                hover:bg-[#204C31]
                disabled:cursor-default
                disabled:opacity-70
              "
              style={{ color: "#FFFFFF" }}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
