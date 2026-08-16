import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fullLogo from "../assets/img/logo/FullLogo.svg";
import LoadingBar from "./LoadingBar";

const firstParagraph = [
  "본 서비스의 피부 타입 분석과 추천은 올",
  "바른 화장품 선택과 스킨케어 습관 형성",
  "을 돕기 위한 웰니스 가이드입니다.",
];

const secondParagraph = [
  "의학적 진단이나 치료를 대신할 수 없으",
  "며, 지속되거나 심해지는 피부 문제는 피",
  "부과 전문의와 상담하시기 바랍니다.",
];

export default function OnboardingStart() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [showGauge, setShowGauge] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const detailTimer = window.setTimeout(() => {
      setShowDetails(true);
    }, 2000);

    const gaugeTimer = window.setTimeout(() => {
      setShowGauge(true);
    }, 2000);

    const to89Timer = window.setTimeout(() => {
      setProgress(89);
    }, 2600);

    const to100Timer = window.setTimeout(() => {
      setProgress(100);
    }, 5200);

    const fadeOutTimer = window.setTimeout(() => {
      setIsSwitching(true);
    }, 7000);

    const revealButtonTimer = window.setTimeout(() => {
      setShowStartButton(true);
      window.setTimeout(() => {
        setButtonVisible(true);
      }, 180);
    }, 7600);

    return () => {
      window.clearTimeout(detailTimer);
      window.clearTimeout(gaugeTimer);
      window.clearTimeout(to89Timer);
      window.clearTimeout(to100Timer);
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(revealButtonTimer);
    };
  }, []);

  return (
    <div className="relative -mx-4 -my-6 flex flex-1 flex-col bg-[#FFFFFF] px-4">
      <div className="flex w-full justify-center pt-[55%] transition-all duration-700 ease-out">
        <img
          src={fullLogo}
          alt="logo"
          className={`h-[90px] w-auto object-contain transition-all duration-700 ease-out ${
            showDetails
              ? "-translate-y-[10%] opacity-100"
              : "translate-y-0 opacity-100"
          }`}
        />
      </div>

      <div
        className={`mt-[10%] flex w-full justify-center transition-all duration-700 ease-out ${
          showDetails ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        <div className="w-full  max-w-[320px] text-center text-[16px] leading-[1.75] text-[#6C6C6C]">
          <p className="m-0 whitespace-pre-line">{firstParagraph.join("\n")}</p>
          <p className="m-0 mt-4 whitespace-pre-line">
            {secondParagraph.join("\n")}
          </p>
        </div>
      </div>

      <div className="mt-auto mb-[30%] w-full pb-2">
        {showGauge && (
          <div
            className={`mx-auto w-[60%] transition-all duration-1200 ease-out ${
              isSwitching ? "opacity-0" : "opacity-100"
            }`}
          >
            <LoadingBar
              value={progress}
              duration={1600}
              height={4}
              showPercent={true}
              className="w-full"
            />
          </div>
        )}

        {showStartButton && (
          <div className="mt-4 flex w-full justify-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`h-[52px] w-[220px] rounded-[14px] bg-[#285E3C] text-[17px] font-medium text-[#FFFFFF] shadow-none transition-all duration-1200 ease-out ${
                buttonVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
