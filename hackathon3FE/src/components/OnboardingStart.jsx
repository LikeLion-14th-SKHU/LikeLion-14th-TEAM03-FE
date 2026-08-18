import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fullLogo from "../assets/img/logo/FullLogo.svg";
import miniLogo from "../assets/img/logo/MiniLogo.svg";
import LoadingBar from "./LoadingBar";
import CompletionLoading from "./CompletionLoading";

const firstParagraph = [
  "뷰티 서비스의 피부 분석과 추천은",
  "바른 화장품 선택과 스킨케어 습관 형성에",
  "도움을 드리기 위한 안내입니다.",
];

const secondParagraph = [
  "의학적 진단이나 치료를 대신할 수 없으며,",
  "지속되거나 심해지는 피부 문제는",
  "피부과 전문의와 상담하시기 바랍니다.",
];

function RequiredDot() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "50%",
        top: "-7px",
        width: "5px",
        height: "5px",
        borderRadius: "9999px",
        backgroundColor: "#1F1F1F",
        transform: "translateX(-50%)",
        zIndex: 1,
      }}
    />
  );
}

function ProfileForm({ onComplete }) {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(20);
  const [nickname, setNickname] = useState("");

  const changeAge = (amount) => {
    setAge((currentAge) => Math.min(100, Math.max(1, currentAge + amount)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) {
      window.alert("닉네임을 입력해주세요.");
      return;
    }

    onComplete({ gender, age, nickname: trimmedNickname });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex h-full w-full animate-[profileIn_500ms_ease-out_both] flex-col px-6 pb-8 pt-5"
    >
      <img src={miniLogo} alt="오뷰" className="h-7 w-auto self-start" />

      <p className="mx-auto mt-[50%] max-w-[280px] text-center text-[18px] leading-[1.55] text-[#252525]">
        <span
          className="relative inline-block font-black"
          style={{ fontWeight: 600 }}
        >
          <RequiredDot />
          성별
        </span>
        과{` `}
        <span
          className="relative inline-block font-black"
          style={{ fontWeight: 600 }}
        >
          <RequiredDot />
          나이
        </span>
        , 사용하실{` `}
        <span
          className="relative inline-block font-black"
          style={{ fontWeight: 600 }}
        >
          <RequiredDot />
          닉네임
        </span>
        을
        <br />
        입력해주세요.
      </p>

      <div
        className="mx-auto mt-[30%] flex w-full max-w-[230px] flex-col"
        style={{ rowGap: "20px" }}
      >
        <div className="flex items-center" style={{ columnGap: "10px" }}>
          <span className="w-[110px] shrink-0 text-right text-[20px] text-[#666]">
            성별(남/여):
          </span>
          <div
            className="relative grid h-12 flex-1 grid-cols-2 rounded-[5px] border border-[#285E3C]/20 bg-white p-1"
            role="group"
            aria-label="성별 선택"
          >
            <span
              className={`absolute  w-[calc(50%)] rounded-lg bg-[#DCE8E0] shadow-[inset_0_0_0_1px_rgba(40,94,60,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${gender === "female" ? "translate-x-full" : "translate-x-0"}`}
            />
            {[
              ["male", "남"],
              ["female", "여"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setGender(value)}
                aria-pressed={gender === value}
                className={`relative z-10 h-[40px] cursor-pointer rounded-lg border-none bg-transparent text-[17px] outline-none transition-all duration-300 active:bg-[#285E3C]/10 ${gender === value ? "scale-110 font-bold text-[#285E3C]" : "scale-100 font-semibold text-[#6F7C73] hover:bg-[#285E3C]/[0.06] hover:text-[#285E3C]"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center" style={{ columnGap: "10px" }}>
          <label
            htmlFor="age"
            className="w-[110px] shrink-0 text-right text-[20px] text-[#666]"
          >
            나이(만):
          </label>
          <div className="flex h-[40px] flex-1 items-center overflow-hidden rounded-[5px] bg-[#E3E3E3]">
            <output
              id="age"
              className="flex-1 pl-5 text-center text-[18px] font-semibold text-[#333]"
            >
              {age}
            </output>
            <div className="  flex h-[40px] w-11 flex-col overflow-hidden rounded-[5px] bg-white/70">
              <button
                type="button"
                onClick={() => changeAge(1)}
                aria-label="나이 올리기"
                className="flex flex-1 items-center justify-center  text-[10px] text-[#285E3C] outline-none transition-colors hover:bg-white active:bg-[#D5E4DA] focus:outline-none"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => changeAge(-1)}
                aria-label="나이 내리기"
                className="flex flex-1 items-center justify-center border-none text-[10px] text-[#285E3C] outline-none transition-colors hover:bg-white active:bg-[#D5E4DA] focus:outline-none"
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center" style={{ columnGap: "10px" }}>
          <label
            htmlFor="nickname"
            className="w-[110px] shrink-0 text-right text-[20px] font-semibold text-[#28613F]"
          >
            닉네임:
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={12}
            autoComplete="nickname"
            className="h-[40px] w-[100px] min-w-0 flex-none rounded-[10px] border-none bg-[#E3E3E3] px-4 text-center text-[17px] text-[#252525] outline-none transition-all duration-200 focus:bg-[#E9F0EB] focus:ring-2 focus:ring-[#285E3C]/35"
            aria-label="닉네임"
          />
        </div>
      </div>

      <button
        type="submit"
        className="absolute bottom-[3%] text-[#fff] right-[7%] border-none h-[40px] w-[88px] rounded-[8px] bg-[#285E3C] text-[17px] font-medium text-white transition-all hover:bg-[#204C31] active:scale-95"
      >
        다음
      </button>
    </form>
  );
}

function GoalForm({ profile, onComplete }) {
  const [purpose, setPurpose] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedPurpose = purpose.trim();
    const trimmedTargetDate = targetDate.trim();

    if (!trimmedPurpose) {
      window.alert("목적을 입력해주세요.");
      return;
    }

    if (!trimmedTargetDate) {
      window.alert("목표 날짜를 입력해주세요.");
      return;
    }

    onComplete({
      ...profile,
      purpose: trimmedPurpose,
      targetDate: trimmedTargetDate,
    });
  };

  const inputClassName =
    "h-[40px] w-[100px] min-w-0 flex-none rounded-[10px] border-none bg-[#E3E3E3] px-4 text-center text-[17px] text-[#252525] outline-none transition-all duration-200 focus:bg-[#E9F0EB] focus:ring-2 focus:ring-[#285E3C]/35";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex h-full w-full animate-[profileIn_500ms_ease-out_both] flex-col px-6 pb-8 pt-5"
    >
      <img src={miniLogo} alt="오뷰" className="h-7 w-auto self-start" />

      <p className="mx-auto mt-[50%] max-w-[300px] text-center text-[18px] leading-[1.55] text-[#252525]">
        <span
          className="relative inline-block font-black"
          style={{ fontWeight: 600 }}
        >
          <RequiredDot />
          목적
        </span>
        과{` `}
        <span
          className="relative inline-block font-black"
          style={{ fontWeight: 600 }}
        >
          <RequiredDot />
          목표 날짜
        </span>
        를 선택해주세요.
        <br />
        <span className="text-[16px] text-[#777]">
          (ex. 여행, 결혼식, 소개팅)
        </span>
      </p>

      <div
        className="mx-auto mt-[30%] flex w-full max-w-[230px] flex-col"
        style={{ rowGap: "20px", transform: "translateX(-15%)" }}
      >
        <div className="flex items-center" style={{ columnGap: "10px" }}>
          <label
            htmlFor="purpose"
            className="w-[110px] shrink-0 text-right text-[20px] font-semibold text-[#2a2a2a]"
          >
            목적:
          </label>
          <input
            id="purpose"
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            maxLength={20}
            className={inputClassName}
            aria-label="목적"
          />
        </div>

        <div className="flex items-center" style={{ columnGap: "10px" }}>
          <label
            htmlFor="targetDate"
            className="w-[110px] shrink-0 text-right text-[20px] font-semibold text-[#2a2a2a]"
          >
            목표 날짜:
          </label>
          <input
            id="targetDate"
            type="date"
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
            className={`${inputClassName} target-date-input w-[150px] px-2 text-[13px]`}
            aria-label="목표 날짜"
          />
        </div>
      </div>

      <button
        type="submit"
        className="absolute bottom-[3%] text-[#fff] right-[7%] h-[40px] w-[88px] rounded-[8px] border-none bg-[#285E3C] text-[17px] font-medium text-white transition-all hover:bg-[#204C31] active:scale-95"
      >
        완료
      </button>
    </form>
  );
}

export default function OnboardingStart() {
  const navigate = useNavigate();
  const [step, setStep] = useState("intro");
  const [profile, setProfile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showGauge, setShowGauge] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setShowDetails(true), 2000),
      window.setTimeout(() => setShowGauge(true), 2000),
      window.setTimeout(() => setProgress(89), 2600),
      window.setTimeout(() => setProgress(100), 5200),
      window.setTimeout(() => setIsSwitching(true), 7000),
      window.setTimeout(() => {
        setShowStartButton(true);
        window.setTimeout(() => setButtonVisible(true), 180);
      }, 7600),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  if (step === "profile") {
    return (
      <ProfileForm
        onComplete={(profileValues) => {
          setProfile(profileValues);
          setStep("goal");
        }}
      />
    );
  }

  if (step === "goal") {
    return (
      <GoalForm
        profile={profile}
        onComplete={(goalValues) => {
          const nextProfile = {
            ...profile,
            ...goalValues,
          };

          setProfile(nextProfile);
          setStep("loading");
        }}
      />
    );
  }

  if (step === "loading") {
    return (
      <CompletionLoading
        onComplete={() =>
          navigate("/skin-survey", {
            state: {
              nickname: profile?.nickname,
              profile,
              purpose: profile?.purpose,
              goalDate: profile?.targetDate,
            },
          })
        }
      />
    );
  }

  return (
    <div className="relative -mx-4 -my-6 flex flex-1 flex-col bg-white px-4">
      <div className="flex w-full justify-center pt-[65%] transition-all duration-700 ease-out">
        <img
          src={fullLogo}
          alt="오뷰"
          className={`h-[90px] w-auto object-contain transition-all duration-700 ease-out ${showDetails ? "-translate-y-[10%]" : "translate-y-0"}`}
        />
      </div>
      <div
        className={`mt-[5%] flex w-full justify-center transition-all duration-700 ease-out ${showDetails ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
      >
        <div className="w-full max-w-[320px] text-center text-[16px] leading-[1.75] text-[#6C6C6C]">
          <p className="m-0 whitespace-pre-line">{firstParagraph.join("\n")}</p>
          <p className="m-0 mt-4 whitespace-pre-line">
            {secondParagraph.join("\n")}
          </p>
        </div>
      </div>
      <div className="relative mb-[30%] mt-auto h-[52px] w-full pb-2">
        {showGauge && (
          <div
            className={`absolute left-1/2 top-0 w-[60%] -translate-x-1/2 transition-opacity duration-1000 ease-out ${isSwitching ? "opacity-0" : "opacity-100"}`}
          >
            <LoadingBar
              value={progress}
              duration={1600}
              height={4}
              showPercent
              className="w-full"
            />
          </div>
        )}
        {showStartButton && (
          <div className="absolute inset-0 flex w-full justify-center">
            <button
              type="button"
              onClick={() => setStep("profile")}
              className={`h-[52px] w-[200px] cursor-pointer rounded-[14px] border-none bg-[#285E3C] text-[17px] font-medium text-[#FFFFFF] shadow-none outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1F4D30] hover:shadow-[0_8px_18px_rgba(40,94,60,0.22)] active:translate-y-0 active:scale-[0.98] active:bg-[#285E3C] focus:outline-none ${buttonVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
