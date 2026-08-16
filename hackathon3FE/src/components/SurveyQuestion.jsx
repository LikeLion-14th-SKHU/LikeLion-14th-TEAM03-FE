export default function SurveyQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelect,
  onPrevious,
  onNext,
  isLastQuestion,
}) {
  return (
    <div className="flex flex-1 animate-[profileIn_500ms_ease-out_both] flex-col">
      <p
        className="m-0 text-center text-[16px] font-medium text-[#2a2a2a]"
        style={{ marginTop: "15%" }}
      >
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
        className="mx-auto mt-[10%] flex flex-col"
        style={{
          rowGap: "24px",
          width: "75%",
          marginTop: "20%",
          maxHeight: "48vh",
          overflowY: "auto",
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
              onClick={() => onSelect(option.id)}
              style={{
                minHeight: "65px",
                backgroundColor: "#FFFFFF",
                borderColor: "#285E3C",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
              className="w-full cursor-pointer rounded-[10px] border-[#285E3C] bg-white px-4 text-[18px] text-[#2a2a2a] outline-none transition-transform duration-300 active:scale-[0.98]"
            >
              <span
                className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSelected ? "scale-110" : "scale-100"}`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-[3%] z-50 h-[40px] w-full">
        <button
          type="button"
          onClick={onPrevious}
          className="absolute top-0 h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#2a2a2a] text-[17px] font-medium text-white outline-none transition-all duration-300 hover:bg-black active:scale-95"
          style={{
            color: "#FFFFFF",
            backgroundColor: "#2a2a2a",
            left: "5%",
          }}
        >
          이전
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute top-0 h-[40px] w-[88px] cursor-pointer rounded-[8px] border-none bg-[#285E3C] text-[17px] font-medium text-white outline-none transition-all duration-300 hover:bg-[#204C31] active:scale-95"
          style={{ color: "#FFFFFF", right: "5%" }}
        >
          {isLastQuestion ? "완료" : "다음"}
        </button>
      </div>
    </div>
  );
}
