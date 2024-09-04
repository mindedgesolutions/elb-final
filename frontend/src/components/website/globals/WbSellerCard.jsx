import seller from "@/assets/website/img/top-seller/default-img.jpg";
import { WbCustomBtn } from "@/components";
import { FaRegStar } from "react-icons/fa6";

const WbSellerCard = () => {
  return (
    <div className="bg-white relative px-2 py-8 rounded-lg border-2 border-gray-100 transition duration-500 hover:border-b hover:border-b-fuchsia-700 hover:shadow-2xl">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="seller-profile-img mb-10">
          <img src={seller} alt={import.meta.env.VITE_APP_TITLE} />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl font-extrabold tracking-wide capitalize">
            Sufankho Jhon
          </h3>
          <div className="top-seller-rating mt-2 mb-8">
            <p className="flex flex-row justify-between items-center gap-1">
              <FaRegStar className="text-md font-light" />
              <span className="text-xs">4.9 (399 Reviews)</span>
            </p>
          </div>
          <WbCustomBtn href={`#`} title={`view profile`} />
        </div>
      </div>
    </div>
  );
};
export default WbSellerCard;
