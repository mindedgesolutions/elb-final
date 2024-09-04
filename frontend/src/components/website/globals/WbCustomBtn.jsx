import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const WbCustomBtn = ({ href, title, customWidth }) => {
  return (
    <Link
      to={href}
      className={`w-btn-secondary-lg ${customWidth} flex gap-[10px] border font-normal border-white px-4 py-3 text-[15px] tracking-wide capitalize`}
    >
      {title}
      <MoveRight size={18} className="font-normal" />
    </Link>
  );
};
export default WbCustomBtn;
