import {
  AdminSmallerTitle,
  WbCustomBtn,
  WbPageBanner,
  WbPageWrapper,
  WbProductCarousel,
  WbProductReviews,
  WbRepeatStars,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import customFetch from "@/utils/customFetch";
import { calculateRating, currencyFormat } from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import dayjs from "dayjs";
import { useLoaderData } from "react-router-dom";
import profile from "@/assets/profile.jpg";
import { setListReviews } from "@/features/postSlice";
import { toast } from "@/components/ui/use-toast";

const WebsiteSingleProductPage = () => {
  const { product, reviews, rating } = useLoaderData();
  const master = product.master.rows[0];
  document.title = `${master.title} | ${import.meta.env.VITE_APP_TITLE}`;
  const sellerName = master.first_name + " " + master.last_name;
  const sellerRating = calculateRating(rating);

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex sm:flex-col md:flex-row gap-4">
          <div className="basis-1/3">
            <WbProductCarousel />
          </div>
          <div className="basis-2/3 flex gap-4">
            <div className="basis-3/4 px-6 pb-6">
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold text-gray-900 tracking-wide pb-4">
                  {master.title}
                </h3>
                <div className="flex justify-start items-center text-sm text-gray-800 font-medium">
                  <p className="tracking-wide leading-loose">
                    Posted by{" "}
                    <span className="ml-1 mr-2 cursor-pointer text-fuchsia-500 hover:text-fuchsia-400 visited:text-purple-600">
                      {sellerName}
                    </span>{" "}
                  </p>
                  <WbRepeatStars count={sellerRating[5]} />{" "}
                  <span className="ml-2 tracking-wide">
                    ({rating[5]} ratings)
                  </span>
                </div>
                <p className="tracking-wide text-sm pb-2 font-medium">
                  on{" "}
                  <span className="mx-1">
                    {dayjs(new Date(master.created_at)).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                  </span>
                </p>
                <Separator />
                <h3 className="py-2 mb-2 text-3xl font-medium tracking-wide">
                  {currencyFormat().format(master.price)}
                </h3>
                <p className="py-4 text-sm leading-relaxed">
                  {master.description}
                </p>
              </div>
              {/* Product specifications starts ------ */}
              {product.details.length > 0 && (
                <>
                  <div className="py-4 mt-4">
                    <h3 className="mb-4 text-xl font-medium tracking-wide uppercase">
                      Specifications
                    </h3>
                    {product.details.map((info, index) => {
                      return (
                        <div key={index} className="text-sm">
                          <div className="flex gap-4 py-3">
                            <div className="basis-1/2 uppercase">
                              {info.label}
                            </div>
                            <div className="basis-1/2">{info.value}</div>
                          </div>
                          <Separator />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {/* Product specifications ends ------ */}
            </div>

            {/* Seller section starts ------ */}
            <div className="basis-1/4">
              <div className="bg-white relative px-2 py-8 rounded-lg border-2 border-gray-100 transition duration-500 hover:shadow-2xl">
                {rating >= 4 && (
                  <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                    <p className="job-type-badge-tertiary px-[6px]">
                      Top Seller
                    </p>
                  </div>
                )}
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="seller-profile-img mb-10">
                    <img
                      src={profile}
                      alt={import.meta.env.VITE_APP_TITLE}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center text-gray-800">
                    <h3 className="text-xl font-medium tracking-wide capitalize">
                      <AdminSmallerTitle title={sellerName} allowed={20} />
                    </h3>
                    <div className="top-seller-rating mt-2 mb-8">
                      <p className="flex flex-col items-center space-y-2">
                        <span className="flex">
                          <WbRepeatStars count={sellerRating[5]} />
                        </span>
                        <span className="text-xs">({rating[5]} Reviews)</span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-md font-medium tracking-widest uppercase mb-2">
                        Want to buy?
                      </p>
                      <WbCustomBtn
                        href={`/seller/${master.slug}`}
                        title={`contact me`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Seller section ends ------ */}
          </div>
        </div>
        <div className="flex mt-10 pb-8">
          <WbProductReviews />
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteSingleProductPage;

// Loader function starts ------
export const loader =
  (store) =>
  async ({ params }) => {
    const { slug } = params;

    try {
      const response = await customFetch.get(`/website/posts/${slug}`);
      const product = response.data;

      if (product) {
        const sellerSlug = product.master.rows[0].slug;

        const productReviews = await customFetch.get(
          `/website/posts/reviewsLtd/${sellerSlug}`
        );
        const reviews = productReviews.data;
        store.dispatch(setListReviews(productReviews.data.data.rows));

        const productRating = await customFetch.get(
          `/website/posts/rating/${sellerSlug}`
        );
        const rating = productRating.data.data;

        return { product, reviews, rating };
      } else {
        toast({ title: "Not found", description: "Product not found!" });
        return;
      }
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };
