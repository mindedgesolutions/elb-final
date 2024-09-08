import {
  AdminSmallerTitle,
  WbCustomBtn,
  WbPageBanner,
  WbPageWrapper,
  WbProductCarousel,
  WbRepeatStars,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import customFetch from "@/utils/customFetch";
import { currencyFormat } from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import dayjs from "dayjs";
import { useLoaderData } from "react-router-dom";
import profile from "@/assets/profile.jpg";

const WebsiteSingleProductPage = () => {
  const { product } = useLoaderData();
  const master = product.master.rows[0];
  // product.details;
  const sellerName = master.first_name + " " + master.last_name;
  const rating = 4;

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
                <div className="flex justify-start items-center text-md text-gray-800 font-medium">
                  <p className="tracking-wide leading-loose">
                    Posted by{" "}
                    <span className="ml-1 mr-2 cursor-pointer text-fuchsia-500 hover:text-fuchsia-400 visited:text-purple-600">
                      {sellerName}
                    </span>{" "}
                  </p>
                  <WbRepeatStars count={4} />{" "}
                  <span className="ml-2 tracking-wide">(201 ratings)</span>
                </div>
                <p className="tracking-wide pb-2 font-medium">
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
                <p className="py-4">{master.description}</p>
              </div>
              {/* Product specifications starts ------ */}
              {product.details.length > 0 && (
                <>
                  <Separator />
                  <div className="py-4">
                    <h3 className="mb-4 text-xl font-medium tracking-wide uppercase">
                      Specifications
                    </h3>
                    {product.details.map((info, index) => {
                      return (
                        <div key={index}>
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
                          <WbRepeatStars count={4} />
                        </span>
                        <span className="text-xs">(201 Reviews)</span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-md font-medium tracking-widest uppercase mb-2">
                        Want to buy?
                      </p>
                      <WbCustomBtn href={`#`} title={`contact me`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Seller section ends ------ */}
          </div>
        </div>
        <div className="flex">
          <div className="basis-2/3 p-6 bg-purple-200 my-8">
            Seller reviews and ratings
          </div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteSingleProductPage;

// Loader function starts ------
export const loader = async ({ params }) => {
  const { slug } = params;

  try {
    const response = await customFetch.get(`/website/posts/${slug}`);
    const product = response.data;

    return { product };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
