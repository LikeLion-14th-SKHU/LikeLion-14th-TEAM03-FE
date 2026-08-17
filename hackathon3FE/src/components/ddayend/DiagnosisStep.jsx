import { useState } from "react";

const MIN = 1;
const MAX = 10;

export default function DiagnosisStep({ scoreKey, beforeScore, onSubmit }) {
  const [afterScore, setAfterScore] = useState(beforeScore);
  const percent = ((afterScore - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="flex min-h-full flex-col px-5">
      <div className="flex flex-1 flex-col justify-center">
        <div>
          <div className="text-[40px]  text-[#1f1f1f]">
            {scoreKey}(1~10)
          </div>
          <div className="mt-1.5 text-[20px]  text-[#9a958c]">
            가장 집중 케어한 항목
          </div>
        </div>

        <div className="mt-10 text-[20px]  text-[#1f1f1f]">
          <div>관리 시작 전:</div>
          <div className=" text-[#1f1f1f]">{beforeScore}</div>
        </div>

        <div className="mt-8">
          <div className="text-[20px]  text-[#285E3C]">
            현재 상태는 어떠신가요?
          </div>

          <div className="relative mt-9 h-9">
            {/* 트랙 배경 */}
            <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#D9D9D9]" />
            {/* 채워진 트랙 */}
            <div
              className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#285E3C]"
              style={{ width: `${percent}%` }}
            />
            {/* 실제 드래그를 처리하는 투명 range input */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={1}
              value={afterScore}
              onChange={(e) => setAfterScore(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
            />
            {/* 값이 표시되는 동그란 손잡이 */}
            <div
              className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#285E3C] text-[14px] font-bold text-white shadow"
              style={{ left: `${percent}%` }}
            >
              {afterScore}
            </div>
          </div>

          <div className="mt-2.5 flex justify-between text-[12px] font-semibold text-[#9a958c]">
            <span>{MIN}</span>
            <span>{MAX}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSubmit(afterScore)}
        className="mb-2 -mr-1 self-end rounded-lg bg-[#285E3C] px-6 py-2 text-[15px]  text-white"
      >
        결과
      </button>
    </div>
  );
}
