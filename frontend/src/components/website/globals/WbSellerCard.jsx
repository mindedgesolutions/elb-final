import { FaRegStar } from "react-icons/fa6";
import profile from "@/assets/profile.jpg";
import { useDispatch } from "react-redux";
import { setLoginForm } from "@/features/commonSlice";
import { checkLoginStatus } from "@/utils/functions";
import { useNavigate } from "react-router-dom";

const WbSellerCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login check starts ------
  const checkLogin = async () => {
    const status = await checkLoginStatus();
    if (status) {
      navigate(`/seller/souvik-nag-admin`);
    } else {
      const history = "seller-page";
      const href = `/seller/souvik-nag-admin`;
      dispatch(setLoginForm({ history, href }));
    }
  };
  // Login check ends ------

  return (
    <div className="bg-white relative px-2 py-8 rounded-lg border-[1px] border-gray-100 transition duration-500 hover:border-b-2 hover:border-b-fuchsia-700 hover:shadow-2xl">
      <div className="job-type-badge position-absolute d-flex flex-column gap-2">
        <p className="job-type-badge-tertiary px-[6px]">Top Seller</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="seller-profile-img mb-10">
          <img
            src={profile}
            alt={import.meta.env.VITE_APP_TITLE}
            className="object-cover"
          />
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
          <button
            type="button"
            className="w-btn-secondary-lg flex gap-[10px] border font-normal border-white px-4 py-3 text-[15px] tracking-wide capitalize"
            onClick={checkLogin}
          >
            view profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default WbSellerCard;
