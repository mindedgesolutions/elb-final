import { currencyFormat } from "@/utils/functions";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productImg from "@/assets/website/img/job/camera.jpg";

const WbProductCard = ({ product, type }) => {
  const { title, price } = product;
  const imgSrc = "";
  const titleLabel =
    title.split("").length > 66 ? title.substring(0, 66) + " ..." : title;

  return (
    <Link to={`/products/${product.slug}`}>
      <article
        className={`rounded-lg bg-white border-2 border-gray-200 transition duration-500 hover:border-b hover:border-b-fuchsia-700 ${
          type === "featured" ? null : "md:hover:shadow-2xl"
        }`}
      >
        <div className="position-relative">
          <div className="flex flex-col group justify-start">
            <section className="p-1">
              <div className="w-full sm:h-36 md:h-60 rounded-lg object-cover overflow-hidden">
                <img
                  src={imgSrc || productImg}
                  className="rounded-lg border border-gray-100"
                />
                <button className="service-card-wishlist-btn">
                  <FaRegHeart />
                </button>
              </div>
            </section>
            <div className="flex flex-col px-2">
              <p className="sm:text-xs md:text-[16px] sm:h-8 md:h-10 text-gray-900 group-hover:text-gray-700 tracking-tight md:leading-5 font-normal mt-3">
                {titleLabel}
              </p>
              <p className="sm:text-sm md:text-lg flex items-baseline font-semibold text-gray-900 group-hover:text-gray-700 tracking-tighter mt-6 pb-3">{`${currencyFormat().format(
                price
              )}`}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default WbProductCard;
