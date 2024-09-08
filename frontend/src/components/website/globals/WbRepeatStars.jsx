import { FaStar } from "react-icons/fa6";

const WbRepeatStars = ({ count }) => {
  const label = Array.from({ length: count }, (_, i) => (
    <FaStar key={i} size={18} className={`font-light fill-yellow-400`} />
  ));

  return label;
};
export default WbRepeatStars;
