import { WbRepeatStars } from "@/components";
import { namePrefix } from "@/utils/functions";
import dayjs from "dayjs";
import { useState } from "react";

const WbProductReviewCard = ({ review }) => {
  const { rating, message, first_name, last_name, updated_at } = review;
  const [showMore, setShowMore] = useState(false);
  const reviewer = first_name + " " + last_name;

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  if (!message) {
    return null;
  }

  const reviewLabel = showMore
    ? message
    : message.length > 150
    ? message.substring(0, 150) + ` ...`
    : message;

  return (
    <section className="p-2 border border-gray-200 rounded-md group">
      <div className="flex sm:flex-col md:flex-row sm:justify-start md:justify-between sm:items-start md:items-center sm:gap-2 md:gap-0">
        <div className="flex gap-1">
          <WbRepeatStars count={rating} />
        </div>
        <span className="text-xs font-extralight">
          {dayjs(new Date(updated_at)).format("dddd, MMMM D, YYYY h:mm A")}
        </span>
      </div>
      <div className="flex sm:flex-col md:flex-row gap-4 mt-[10px]">
        <div className="sm:hidden md:block">
          <div className="min-w-20 h-20 text-4xl font-bold tracking-wider text-gray-950 group-hover:text-gray-700 bg-gray-100 flex justify-center items-center">
            {namePrefix(reviewer)}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-normal italic tracking-wider text-justify">
            {reviewLabel}
            {message.length > 120 && (
              <button
                type="button"
                className="ml-4 text-sm font-medium text-fuchsia-500 hover:text-fuchsia-600 capitalize"
                onClick={toggleMore}
              >
                {showMore ? `show less` : `show more`}
              </button>
            )}
          </p>
          <h3 className="mt-3 text-md font-medium text-gray-800 uppercase tracking-wide">
            {first_name} {last_name}
          </h3>
        </div>
      </div>
    </section>
  );
};
export default WbProductReviewCard;
