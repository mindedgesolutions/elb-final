import {
  WbCustomBtn,
  WbProductReviewCard,
  WbRatingStatusbar,
} from "@/components";
import { nanoid } from "nanoid";

const WbProductReviews = ({ reviews }) => {
  const oneStar = reviews?.filter((i) => i.rating === 1);
  const twoStar = reviews?.filter((i) => i.rating === 2);
  const threeStar = reviews?.filter((i) => i.rating === 3);
  const fourStar = reviews?.filter((i) => i.rating === 4);
  const fiveStar = reviews?.filter((i) => i.rating === 5);

  const rating = (1000 * 5 + 400 * 4 + 100 * 3 + 0 * 2 + 0 * 1) / 1500;

  return (
    <section className="flex flex-col">
      <h3 className="py-2 mb-2 text-3xl font-medium tracking-wide">Reviews</h3>
      <div className="flex flex-row gap-6">
        <div className="w-36 rounded-lg bg-gray-200 flex flex-col justify-center items-center space-y-2">
          <h3 className="text-2xl font-bold tracking-wide text-gray-800">
            {rating}
          </h3>
          <p className="text-sm font-medium text-gray-800">1500 reviews</p>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <WbRatingStatusbar stars={5} review={1000} totalReview={1500} />
          <WbRatingStatusbar stars={4} review={400} totalReview={1500} />
          <WbRatingStatusbar stars={3} review={100} totalReview={1500} />
          <WbRatingStatusbar stars={2} review={0} totalReview={1500} />
          <WbRatingStatusbar stars={1} review={0} totalReview={1500} />
        </div>
      </div>
      <div className="flex justify-start items-start my-10">
        <WbCustomBtn title={`leave a review`} customWidth={`w-[200px]`} />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }, (_, index) => {
          return <WbProductReviewCard key={nanoid()} />;
        })}
      </div>
    </section>
  );
};
export default WbProductReviews;
