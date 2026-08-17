export default function QuestionStep({ totalDays, onNext }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="text-[30px] font-bold leading-relaxed text-[#1f1f1f]">
          {totalDays}일 간의 피부 관리는
          <br />
          어떠셨나요?
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mb-2 mr-4 self-end rounded-lg bg-[#285E3C] px-6 py-2 text-[15px]  text-white"
      >
        다음
      </button>
    </div>
  );
}
