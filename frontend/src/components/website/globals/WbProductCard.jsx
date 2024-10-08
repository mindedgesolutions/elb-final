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

  let imgSrc;
  if (product.product_images?.[0]?.path) {
    const coverImg = product.product_images.find((img) => img.cover === true);
    const cardImg = coverImg?.path || product.product_images?.[0]?.path;
    imgSrc = `${import.meta.env.VITE_BASE_URL}/${cardImg}`;
  } else {
    imgSrc = "";
  }

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
    <>
      {/* For desktop starts ------ */}
      <article
        className={`rounded-lg bg-white border-[1px] border-gray-200 transition duration-500 hover:border-b-2 hover:border-b-fuchsia-700 ${
          type === "featured" ? null : "md:hover:shadow-2xl"
        }`}
      >
        <div className="position-relative">
          <div className="flex flex-col group justify-start">
            <section className="p-1">
              <div className="w-full h-60 md:h-60 rounded-lg overflow-hidden flex justify-center items-center">
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={imgSrc || productImg}
                    className="rounded-lg border-gray-100 h-60 object-cover"
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
                <p className="text-lg md:text-[16px] h-10 md:h-10 text-gray-900 group-hover:text-gray-700 tracking-wider md:leading-5 font-semibold mt-3">
                  {titleLabel}
                </p>
                <section className="">
                  <p className="text-sm font-normal tracking-wide capitalize">
                    Posted on:{" "}
                    {dayjs(new Date(product.updated_at)).format("MMMM D, YYYY")}
                  </p>
                </section>
                <section className="flex items-baseline mt-3 pb-3">
                  <p className="text-lg md:text-[16px] font-semibold text-gray-900 group-hover:text-gray-700 tracking-wide">{`${currencyFormat().format(
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
                      <h3 className="font-normal tracking-wider capitalize">
                        {sellerNameLabel}
                      </h3>
                    </span>
                    <span className="flex flex-row">
                      <WbRepeatStars
                        count={Math.round(product.seller_rating)}
                      />
                    </span>
                  </div>
                </section>
              </div>
            </Link>
          </div>
        </div>
      </article>
      {/* For desktop ends ------ */}

      {/* For mobile view starts ------ */}
      {/* <article
        className={`block md:hidden rounded-lg bg-white border-[1px] border-gray-200 transition duration-500 hover:border-b-2 hover:border-b-fuchsia-700 ${
          type === "featured" ? null : "md:hover:shadow-2xl"
        }`}
      >
        <div className="flex flex-row gap-2 relative group">
          <section className="p-1">
            <div className="w-24 h-24 rounded-lg overflow-hidden">
              <Link to={`/products/${product.slug}`}>
                <img
                  src={imgSrc || productImg}
                  className="rounded-lg border border-gray-100 object-cover"
                />
              </Link>
            </div>
          </section>
          <div className="flex flex-row justify-between items-start gap-1">
            <button
              className="absolute top-0 right-0 service-card-wishlist-btn z-10"
              onClick={checkLogin}
            >
              <FaRegHeart />
            </button>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-xs text-gray-900 group-hover:text-gray-700 tracking-wider font-medium mt-3">
                {titleLabel}
              </p>
              <section className="">
                <p className="text-xs font-normal tracking-wide capitalize my-1">
                  Posted on:{" "}
                  {dayjs(new Date(product.updated_at)).format("MMMM D, YYYY")}
                </p>
              </section>
              <section className="flex items-baseline pb-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 tracking-wide">{`${currencyFormat().format(
                  price
                )}`}</p>
              </section>
              <Separator />
              <section className="flex flex-row gap-3 pb-1">
                <div className="flex flex-col">
                  <span>
                    <h3 className="text-xs font-normal tracking-wider capitalize">
                      Posted By: {sellerNameLabel}
                    </h3>
                  </span>
                  <span className="flex flex-row gap-1">
                    <WbRepeatStars count={Math.round(product.seller_rating)} />
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </article> */}
      {/* For mobile view ends ------ */}
    </>
  );
};
export default WbProductCard;
