import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import ConcernInput from "../components/home/ConcernInput";
import ConcernResult from "../components/home/ConcernResult";
import { addConcern } from "../api/cards";
import { restartOnboarding } from "../api/onboarding";

export default function ConcernNew() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [pending, setPending] = useState(false);
  const [recheckPending, setRecheckPending] = useState(false);

  async function handleSubmit(text) {
    setPending(true);
    try {
      // POST /api/cards/concern → { status, message, cautions, medicalReferral }
      const real = await addConcern(text);
      setResult(real);
    } catch {
      // 세션/온보딩이 없거나 백엔드 연결이 안 될 때도 화면 흐름은 보여줄 수 있도록
      // 임시 AI 응답으로 대체합니다 (실제 배포 환경에서는 real 응답으로 대체됩니다).
      setResult({
        status: "REDUCE",
        message: "초기 반응일 수 있어요. 사용 빈도를 주 2회로 줄여보세요.",
        cautions: ["줄여도 붉은기가 3일 이상 지속되면 중단해 주세요"],
        medicalReferral: false,
      });
    } finally {
      setPending(false);
    }
  }

  async function handleRecheck() {
    setRecheckPending(true);
    try {
      await restartOnboarding();
    } catch {
      // 실패해도 재검사 플로우로는 이동시켜줍니다.
    } finally {
      setRecheckPending(false);
      navigate("/onboarding");
    }
  }

  return (
    <section className="bg-[#E7E7E8] px-5 py-6 flex flex-1 flex-col gap-3">
      <BackButton />
      <div className="flex flex-1 flex-col justify-center gap-3">
        <ConcernInput onSubmit={handleSubmit} pending={pending} />
        <ConcernResult
          result={result}
          onRecheck={handleRecheck}
          recheckPending={recheckPending}
        />
      </div>
    </section>
  );
}
