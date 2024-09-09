import { WbRepeatStars } from "@/components";
import { useState } from "react";

const WbProductReviewCard = () => {
  const [showMore, setShowMore] = useState(false);

  const review =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt delectus praesentium ipsum quis at corrupti incidunt numquam mollitia consequatur dolores. Eos quisquam nihil, inventore delectus, mollitia consequuntur in odio earum dolores, dignissimos dolor vero nobis labore ea sit veniam aspernatur!";

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const reviewLabel = showMore
    ? review
    : review.length > 150
    ? review.substring(0, 150) + ` ...`
    : review;

  return (
    <section className="p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <WbRepeatStars count={5} />
        </div>
        <span className="text-xs font-extralight">
          Tuesday, September 3, 2024 8:34 PM
        </span>
      </div>
      <div className="flex gap-4 mt-4 group">
        <div className="min-w-20 h-20 text-4xl font-bold tracking-wider text-gray-700 group-hover:text-gray-600 bg-gray-100 flex justify-center items-center">
          SN
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-extralight italic tracking-wider text-justify">
            {reviewLabel}
            {review.length > 120 && (
              <button
                type="button"
                className="ml-4 text-sm font-medium text-fuchsia-500 hover:text-fuchsia-600 capitalize"
                onClick={toggleMore}
              >
                {showMore ? `show less` : `show more`}
              </button>
            )}
          </p>
          <h3 className="mt-3 text-md font-medium text-gray-800">Souvik Nag</h3>
        </div>
      </div>
    </section>
  );
};
export default WbProductReviewCard;
