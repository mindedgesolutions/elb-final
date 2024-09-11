import {
  WbAddEditReview,
  WbCustomBtn,
  WbProductReviewCard,
  WbRatingStatusbar,
} from "@/components";
import { calculateRating } from "@/utils/functions";
import { MoveRight } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

const WbProductReviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const { product, rating } = useLoaderData();
  const sellerSlug = product.master.rows[0].slug;
  const { listReviews } = useSelector((store) => store.posts);
  const reviews = listReviews;
  const sellerRating = calculateRating(rating);

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
                  {sellerRating[5]}
                </h3>
                <p className="text-sm font-medium text-gray-800">
                  {rating[5]} reviews
                </p>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <WbRatingStatusbar
                  stars={5}
                  review={sellerRating[4]}
                  totalReview={rating[5]}
                />
                <WbRatingStatusbar
                  stars={4}
                  review={sellerRating[3]}
                  totalReview={rating[5]}
                />
                <WbRatingStatusbar
                  stars={3}
                  review={sellerRating[2]}
                  totalReview={rating[5]}
                />
                <WbRatingStatusbar
                  stars={2}
                  review={sellerRating[1]}
                  totalReview={rating[5]}
                />
                <WbRatingStatusbar
                  stars={1}
                  review={sellerRating[0]}
                  totalReview={rating[5]}
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
        <>
          <div className="grid grid-cols-2 gap-3">
            {reviews.map((review) => {
              return <WbProductReviewCard key={nanoid()} review={review} />;
            })}
          </div>
          {rating[5] > 6 && (
            <div className="flex justify-end items-end mt-4">
              <WbCustomBtn
                title={`show all`}
                href={`/seller/reviews/${sellerSlug}`}
              />
            </div>
          )}
        </>
      ) : (
        <h3 className="text-3xl font-semibold">No review found</h3>
      )}
    </div>
  );
};
export default WbProductReviews;
