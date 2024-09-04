import { currencyFormat } from "@/utils/functions";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productImg from "@/assets/website/img/job/camera.jpg";

const WbProductCard = ({ product }) => {
  const { title, price } = product;
  const imgSrc = "";
  const titleLabel =
    title.split("").length > 58 ? title.substring(0, 58) + " ..." : title;

  return (
    <Link to={`#`}>
      <article className="rounded-lg border-2 border-gray-100 transition duration-500 hover:border-b hover:border-b-fuchsia-700 hover:shadow-2xl">
        <div className="job-post position-relative">
          <div className="flex flex-col group justify-start">
            <div className="w-full sm:h-56 md:h-60 rounded-lg object-cover overflow-hidden">
              <img
                src={imgSrc || productImg}
                className="rounded-lg border border-gray-100"
              />
              <button className="service-card-wishlist-btn">
                <FaRegHeart />
              </button>
            </div>
            <div className="flex flex-col px-2">
              <p className="text-md h-10 text-gray-950 group-hover:text-gray-700 tracking-tighter mt-3">
                {titleLabel}
              </p>
              <p className="text-lg flex items-baseline font-semibold text-black group-hover:text-gray-700 tracking-tighter mt-6 pb-3">{`${currencyFormat().format(
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
