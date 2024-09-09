import {
  WbAddEditReview,
  WbProductReviewCard,
  WbRatingStatusbar,
} from "@/components";
import { MoveRight } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";

const WbProductReviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const { listReviews } = useSelector((store) => store.posts);
  const reviews = listReviews;

  const oneStar = reviews && reviews?.filter((i) => i.rating === 1);
  const twoStar = reviews && reviews?.filter((i) => i.rating === 2);
  const threeStar = reviews && reviews?.filter((i) => i.rating === 3);
  const fourStar = reviews && reviews?.filter((i) => i.rating === 4);
  const fiveStar = reviews && reviews?.filter((i) => i.rating === 5);

  const rating =
    reviews.length > 0
      ? (
          (fiveStar.length * 5 +
            fourStar.length * 4 +
            threeStar.length * 3 +
            twoStar.length * 2 +
            oneStar.length * 1) /
          reviews.length
        ).toFixed(0)
      : 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <div className="basis-1/2">
          <div className="flex flex-col">
            <h3 className="py-2 mb-2 text-3xl font-medium tracking-wide">
              Reviews
            </h3>
            <div className="flex flex-row gap-4">
              <div className="w-36 rounded-lg bg-gray-200 flex flex-col justify-center items-center space-y-2">
                <h3 className="text-4xl font-bold tracking-wide text-gray-800">
                  {rating ? rating : 0}
                </h3>
                <p className="text-sm font-medium text-gray-800">
                  {reviews.length} reviews
                </p>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <WbRatingStatusbar
                  stars={5}
                  review={fiveStar.length}
                  totalReview={reviews.length}
                />
                <WbRatingStatusbar
                  stars={4}
                  review={fourStar.length}
                  totalReview={reviews.length}
                />
                <WbRatingStatusbar
                  stars={3}
                  review={threeStar.length}
                  totalReview={reviews.length}
                />
                <WbRatingStatusbar
                  stars={2}
                  review={twoStar.length}
                  totalReview={reviews.length}
                />
                <WbRatingStatusbar
                  stars={1}
                  review={oneStar.length}
                  totalReview={reviews.length}
                />
              </div>
            </div>
            <div className="flex justify-start items-start my-10">
              <button
                type="button"
                className="w-btn-secondary-lg flex gap-[10px] border font-normal border-white px-4 py-3 text-[15px] tracking-wide capitalize"
                onClick={() => setOpenModal(true)}
              >
                leave a review
                <MoveRight size={18} className="font-normal" />
              </button>
            </div>

            <WbAddEditReview
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      </div>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {reviews.map((review) => {
            return <WbProductReviewCard key={nanoid()} review={review} />;
          })}
        </div>
      ) : (
        <h3 className="text-3xl font-semibold">No review found</h3>
      )}
    </div>
  );
};
export default WbProductReviews;
