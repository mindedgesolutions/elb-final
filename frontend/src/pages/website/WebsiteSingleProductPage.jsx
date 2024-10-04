import {
  AdminSmallerTitle,
  WbPageBanner,
  WbPageWrapper,
  WbProductCarousel,
  WbProductReviews,
  WbRepeatStars,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import customFetch from "@/utils/customFetch";
import {
  calculateRating,
  checkLoginStatus,
  currencyFormat,
} from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import dayjs from "dayjs";
import { useLoaderData, useNavigate } from "react-router-dom";
import profile from "@/assets/profile.jpg";
import { setListReviews } from "@/features/postSlice";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { MoveRight } from "lucide-react";
import { setLoginForm } from "@/features/commonSlice";

const WebsiteSingleProductPage = () => {
  const navigate = useNavigate();
  const { product, rating } = useLoaderData();
  const master = product.master.rows[0];
  const dispatch = useDispatch();
  document.title = `${master.title} | ${import.meta.env.VITE_APP_TITLE}`;
  const sellerName = master.first_name + " " + master.last_name;
  const sellerRating = calculateRating(rating);

  // Login check starts ------
  const checkLogin = async () => {
    const status = await checkLoginStatus();
    if (status) {
      navigate(`/seller/${master.slug}`);
    } else {
      dispatch(
        setLoginForm({
          history: "seller-page",
          href: `/seller/${master.slug}`,
        })
      );
    }
  };
  // Login check ends ------

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex sm:flex-col md:flex-row gap-4">
          <h3 className="sm:text-xl md:text-3xl font-bold text-gray-900 tracking-wide pb-0 sm:block md:hidden">
            {master.title}
          </h3>
          <div className="sm:w-full md:basis-1/3">
            <WbProductCarousel />
          </div>
          <div className="sm:w-full md:basis-2/3 flex sm:flex-col md:flex-row sm:gap-2 md:gap-4">
            <div className="sm:w-full md:w-[calc(100%_-_275px)] sm:px-2 md:px-6 sm:pb-4 md:pb-6">
              <div className="flex flex-col">
                <h3 className="sm:text-xl md:text-3xl font-bold text-gray-900 tracking-wide pb-4 sm:hidden md:block">
                  {master.title}
                </h3>
                <div className="flex sm:flex-col md:flex-row justify-start sm:items-start md:items-center text-sm text-gray-800 font-medium">
                  <p className="tracking-wide leading-loose">
                    Posted by{" "}
                    <span className="ml-1 mr-2 cursor-pointer text-fuchsia-500 hover:text-fuchsia-400 visited:text-purple-600">
                      {sellerName}
                    </span>{" "}
                  </p>
                  <div className="flex">
                    <WbRepeatStars count={Math.round(sellerRating[5])} />{" "}
                    <span className="ml-2 tracking-wide">
                      ({rating[5]} ratings)
                    </span>
                  </div>
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
                <h3 className="py-2 sm:mb-0 md:mb-2 sm:text-xl md:text-3xl font-medium tracking-wide">
                  {currencyFormat().format(master.price)}
                </h3>
                <p className="sm:py-2 md:py-4 text-sm leading-relaxed">
                  {master.description}
                </p>
              </div>
              {/* Product specifications starts ------ */}
              {product.details.length > 0 && (
                <>
                  <div className="sm:py-2 md:py-4 mt-4">
                    <h3 className="mb-4 text-xl font-medium tracking-wide uppercase">
                      Specifications
                    </h3>
                    {product.details.map((info, index) => {
                      return (
                        <div key={index} className="text-sm">
                          <div className="flex sm:flex-col md:flex-row sm:gap-2 md:gap-4 py-3">
                            <div className="sm:w-full md:basis-1/2 uppercase sm:font-semibold md:font-normal">
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
            <div className="sm:w-full md:w-[275px]">
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
                          <WbRepeatStars count={Math.round(sellerRating[5])} />
                        </span>
                        <span className="text-xs">({rating[5]} Reviews)</span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-md font-medium tracking-widest uppercase mb-2">
                        interested?
                      </p>
                      <button
                        type="button"
                        className="w-btn-secondary-lg flex gap-[10px] border font-normal border-white px-4 py-3 text-[15px] tracking-wide capitalize"
                        onClick={checkLogin}
                      >
                        contact me
                        <MoveRight size={18} className="font-normal" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Seller section ends ------ */}
          </div>
        </div>
        <div className="flex sm:mt-5 md:mt-10 sm:pb-4 md:pb-8">
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
