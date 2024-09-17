import { checkLoginStatus, currencyFormat } from "@/utils/functions";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productImg from "@/assets/website/img/job/camera.jpg";
import { setLoginForm } from "@/features/commonSlice";
import { useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator";
import sellerImg from "@/assets/profile.jpg";
import dayjs from "dayjs";
import { WbRepeatStars } from "@/components";

const WbProductCard = ({ product, type }) => {
  const dispatch = useDispatch();
  const { title, price } = product;
  const imgSrc = "";
  const titleLabel =
    title.split("").length > 25 ? title.substring(0, 25) + " ..." : title;
  const sellerName = product.first_name + " " + product.last_name;
  const sellerNameLabel =
    sellerName.length > 20 ? sellerName.substring(0, 20) + ` ...` : sellerName;

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
          <Link to={`/products/${product.slug}`} className="px-1">
            <div className="flex flex-col px-2">
              <p className="sm:text-xs md:text-[16px] sm:h-10 md:h-10 text-gray-900 group-hover:text-gray-700 tracking-wider md:leading-5 font-semibold mt-3">
                {titleLabel}
              </p>
              <section className="">
                <p className="text-sm font-normal tracking-wide capitalize">
                  Posted on:{" "}
                  {dayjs(new Date(product.updated_at)).format("MMMM D, YYYY")}
                </p>
              </section>
              <section className="flex items-baseline mt-3 pb-3">
                <p className="sm:text-sm md:text-[16px] font-semibold text-gray-900 group-hover:text-gray-700 tracking-wide">{`${currencyFormat().format(
                  price
                )}`}</p>
              </section>
              <Separator />
              <section className="flex flex-row gap-3 py-3">
                <div className="w-10 h-10 flex justify-center items-center object-cover overflow-hidden rounded-full">
                  <img
                    src={sellerImg}
                    alt={import.meta.env.VITE_APP_TITLE}
                    className=""
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span>
                    <h3 className="text-xs font-normal tracking-wider uppercase">
                      {sellerNameLabel}
                    </h3>
                  </span>
                  <span className="flex flex-row gap-1">
                    <WbRepeatStars count={Math.round(product.seller_rating)} />
                  </span>
                </div>
              </section>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};
export default WbProductCard;
