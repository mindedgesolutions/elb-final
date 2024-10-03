import {
  WbPageBanner,
  WbPageWrapper,
  WbPaginationContainer,
  WbProductCard,
  WbRatingStatusbar,
  WbSellerSidebar,
} from "@/components";
import { setSellerProfile, setSellerRating } from "@/features/usersSlice";
import customFetch from "@/utils/customFetch";
import { calculateRating } from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import { nanoid } from "nanoid";
import { redirect, useLoaderData } from "react-router-dom";

const WebsiteSellerProducts = () => {
  window.scrollTo(0, 0);
  const { profile, rating, products, meta } = useLoaderData();
  const sellerRating = calculateRating(rating);

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
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 mt-12">
                  {products.map((product) => {
                    return <WbProductCard key={nanoid()} product={product} />;
                  })}
                </div>
                {meta.totalPages > 1 && (
                  <div className="mt-16">
                    <WbPaginationContainer />
                  </div>
                )}
              </>
            ) : (
              <h3 className="text-3xl font-semibold">No product found</h3>
            )}
          </div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteSellerProducts;

// Loader function starts ------
export const loader =
  (store) =>
  async ({ params, request }) => {
    const { slug } = params;
    const search = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { sellerProfile, sellerRating } = store.getState().users;

    try {
      let profile = sellerProfile?.profile?.data?.rows[0];
      let rating = sellerRating.rating;

      if (!sellerProfile?.profile?.data?.rows[0]?.first_name) {
        const response = await customFetch.get(`/posts/sellerProfile/${slug}`);
        profile = response.data.data.rows[0];
        store.dispatch(setSellerProfile({ profile: response.data }));
      }

      if (sellerRating?.rating?.length === 0 || !sellerRating?.rating?.length) {
        const reviewRating = await customFetch.get(
          `/website/posts/rating/${slug}`
        );
        rating = reviewRating.data.data;
        store.dispatch(setSellerRating({ rating }));
      }

      const sellerProducts = await customFetch.get(
        `/website/posts/sellerProducts/${slug}`,
        { params: search }
      );
      const products = sellerProducts.data.data.rows;
      const meta = sellerProducts.data.meta;

      return { profile, rating, products, meta };
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      console.log(error);
      return redirect(`/`);
    }
  };
