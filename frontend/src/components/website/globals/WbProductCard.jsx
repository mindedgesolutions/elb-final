import { checkLoginStatus, currencyFormat } from "@/utils/functions";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productImg from "@/assets/website/img/job/camera.jpg";
import { setLoginForm } from "@/features/commonSlice";
import { useDispatch } from "react-redux";

const WbProductCard = ({ product, type }) => {
  const dispatch = useDispatch();
  const { title, price } = product;
  const imgSrc = "";
  const titleLabel =
    title.split("").length > 60 ? title.substring(0, 60) + " ..." : title;

  // Login check starts ------
  const checkLogin = async () => {
    const status = await checkLoginStatus();
    if (status) {
      console.log(`wishlist the product`);
    } else {
      const history = "wishlist";
      const href = "";

      dispatch(setLoginForm({ history, href }));
    }
  };
  // Login check ends ------

  return (
    <article
      className={`rounded-lg bg-white border-[1px] border-gray-200 transition duration-500 hover:border-b-2 hover:border-b-fuchsia-700 ${
        type === "featured" ? null : "md:hover:shadow-2xl"
      }`}
    >
      <div className="position-relative">
        <div className="flex flex-col group justify-start">
          <section className="p-1">
            <div className="w-full sm:h-36 md:h-60 rounded-lg object-cover overflow-hidden">
              <Link to={`/products/${product.slug}`}>
                <img
                  src={imgSrc || productImg}
                  className="rounded-lg border border-gray-100"
                />
              </Link>
              <button
                className="service-card-wishlist-btn z-10"
                onClick={checkLogin}
              >
                <FaRegHeart />
              </button>
            </div>
          </section>
          <Link to={`/products/${product.slug}`}>
            <div className="flex flex-col px-2">
              <p className="sm:text-xs md:text-sm sm:h-10 md:h-10 text-gray-900 group-hover:text-gray-700 tracking-normal md:leading-5 font-normal mt-3">
                {titleLabel}
              </p>
              <p className="sm:text-sm md:text-[16px] flex items-baseline font-semibold text-gray-900 group-hover:text-gray-700 tracking-tighter mt-6 pb-3">{`${currencyFormat().format(
                price
              )}`}</p>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};
export default WbProductCard;
