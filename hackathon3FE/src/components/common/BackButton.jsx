import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="self-start flex items-center gap-1 bg-white rounded-full shadow-sm px-3 py-1.5 text-[13px] font-semibold text-[#1f1f1f]"
    >
      <span aria-hidden="true">←</span>
      뒤로가기
    </button>
  );
}
