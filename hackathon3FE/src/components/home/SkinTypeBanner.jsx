import { Link } from "react-router-dom";
import { skinTypeLabel } from "../../utils/skinType";

export default function SkinTypeBanner({ nickname, baseType }) {
  return (
    <Link to="/skin-result" className="block bg-[#E2D9D0] rounded-2xl px-4 py-3">
      <div className="text-[16px] font-bold text-[#1f1f1f] leading-snug">
        {nickname}님의 피부 타입은
        <br />
        {skinTypeLabel(baseType)}이에요
      </div>
      <div className="mt-1.5 text-[12px] font-medium text-[#6f6c62]">
        최근 받았던 설문 결과를 볼 수 있어요 &gt;&gt;
      </div>
    </Link>
  );
}
