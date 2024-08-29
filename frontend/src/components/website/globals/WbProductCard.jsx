import { currencyFormat } from "@/utils/functions";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productImg from "@/assets/website/img/job/camera.jpg";

const WbProductCard = ({
  imgSrc,
  postTitle = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, itaque.",
  price = 1000,
}) => {
  const title =
    postTitle.split("").length > 58
      ? postTitle.substring(0, 58) + " ..."
      : postTitle;

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
            <p className="text-md text-gray-950 group-hover:text-gray-700 tracking-tighter mt-3">
              {title}
            </p>
            <p className="text-lg font-semibold text-black group-hover:text-gray-700 tracking-tighter mt-6 pb-3">{`${currencyFormat().format(
              price
            )}`}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default WbProductCard;
