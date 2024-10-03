import {
  WbCustomBtn,
  WbPageBanner,
  WbPageWrapper,
  WbProductCard,
  WbProductReviewCard,
  WbRatingStatusbar,
  WbSellerSidebar,
} from "@/components";
import { setSellerProfile, setSellerRating } from "@/features/usersSlice";
import customFetch from "@/utils/customFetch";
import { calculateRating } from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import { nanoid } from "nanoid";
import { redirect, useLoaderData } from "react-router-dom";

const WebsiteSeller = () => {
  const { profile, products, reviews, rating } = useLoaderData();
  const sellerRating = calculateRating(rating);
  document.title = `${profile.first_name.toUpperCase()} ${profile.last_name.toUpperCase()} | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex flex-col md:flex-row gap-8 pb-8">
          <div className="w-full md:basis-1/4">
            <WbSellerSidebar rating={rating} overall={sellerRating[5]} />
          </div>
          <div className="basis-3/4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-40 p-4 rounded-lg bg-gray-100 flex flex-col justify-center items-center">
                <h3 className="text-5xl text-fuchsia-700 font-semibold">
                  {sellerRating[5]}
                </h3>
                <p className="text-sm font-medium text-gray-800 mt-2">
                  {rating[5]} review{rating[5] > 1 ? "s" : null}
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

            {rating[5] > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-12">
                  {reviews.map((review) => {
                    return (
                      <WbProductReviewCard key={nanoid()} review={review} />
                    );
                  })}
                </div>
                <div className="flex justify-end items-end my-4">
                  <WbCustomBtn
                    title={`show all`}
                    href={`/seller/reviews/${profile.slug}`}
                  />
                </div>
              </>
            ) : (
              <h3 className="text-3xl font-semibold py-20">No review found</h3>
            )}
            <div className="flex flex-col pt-0">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-800">
                My posts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
                {products?.map((product) => {
                  return <WbProductCard key={product.slug} product={product} />;
                })}
              </div>
              <div className="flex justify-end items-end my-4">
                <WbCustomBtn
                  title={`show all`}
                  href={`/seller/posts/${profile.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteSeller;

// Loader function starts ------
export const loader =
  (store) =>
  async ({ params }) => {
    const { slug } = params;

    try {
      const response = await customFetch.get(`/posts/sellerProfile/${slug}`);
      const profile = response.data.data.rows[0];
      const products = response.data.products.rows;
      const reviews = response.data.reviews.rows;
      const totalPosts = response.data.totalPosts;

      const sellerRating = await customFetch.get(
        `/website/posts/rating/${slug}`
      );
      const rating = sellerRating.data.data;

      store.dispatch(setSellerProfile({ profile: response.data }));
      store.dispatch(setSellerRating({ rating }));

      return { profile, products, reviews, totalPosts, rating };
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return redirect(`/`);
    }
  };
