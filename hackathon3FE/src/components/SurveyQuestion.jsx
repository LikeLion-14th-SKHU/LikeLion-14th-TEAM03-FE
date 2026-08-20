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

  return (
    <div className="flex flex-1 animate-[profileIn_500ms_ease-out_both] flex-col">
      <p
        className="relative m-0 text-center text-[16px] font-medium text-[#2a2a2a]"
        style={{ marginTop: "15%" }}
      >
        <button
          type="button"
          aria-label="이전 질문"
          onClick={onPrevious}
          className="absolute left-0 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-0 text-[#2a2a2a] outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
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
        className="m-0 text-center text-[19px] leading-[1.45] text-[#2a2a2a]"
        style={{ marginTop: "15%", fontWeight: 350 }}
      >
        {question.question.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      <div
        className="mx-auto flex flex-col"
        style={{
          rowGap: "24px",
          width: "75%",
          marginTop: isMultiple ? "10%" : "20%",
          maxHeight: isMultiple ? "40vh" : "48vh",
          overflowY: isMultiple ? "auto" : "visible",
          padding: "2px 4px",
          scrollbarWidth: "none",
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

                // 단일 선택 질문만 선택 즉시 다음으로 이동
                if (!isMultiple) {
                  onNext(nextSelectedOption);
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
              className="w-full cursor-pointer rounded-[10px] border-[#285E3C] px-4 text-[18px] text-[#2a2a2a] outline-none transition-[background-color,transform] duration-300 active:scale-[0.98]"
            >
              <span
                className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isSelected ? "scale-110" : "scale-100"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 복수선택 질문에서만 다음 버튼 표시 */}
      {isMultiple && (
        <button
          type="button"
          onClick={() => onNext(selectedOption)}
          className="absolute bottom-[3%] right-[7%] h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#285E3C] text-[17px] font-medium text-white outline-none transition-all duration-300 hover:bg-[#204C31] active:scale-95"
          style={{ color: "#FFFFFF" }}
        >
          다음
        </button>
      )}
    </div>
  );
}
