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
    postTitle.split("").length > 25
      ? postTitle.substring(0, 25) + " ..."
      : postTitle;

  return (
    <Link to={`#`}>
      <article className="rounded-xl border-2">
        <div className="job-post position-relative">
          <div className="flex flex-col group justify-start p-1">
            <div className="w-full sm:h-56 md:h-72 rounded-2xl object-cover overflow-hidden">
              <img
                src={imgSrc || productImg}
                className="rounded-2xl border border-gray-100"
              />
              <button className="service-card-wishlist-btn">
                <FaRegHeart />
              </button>
            </div>
            <p className="text-xl font-semibold text-purple-950 group-hover:text-purple-800 tracking-normal mt-6">
              {title}
            </p>
            <p className="text-xl font-semibold text-purple-950 group-hover:text-purple-800 tracking-normal mt-6 pb-4">{`${currencyFormat().format(
              price
            )}`}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default WbProductCard;
