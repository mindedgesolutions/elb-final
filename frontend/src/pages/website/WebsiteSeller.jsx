import { WbPageBanner, WbPageWrapper, WbSellerSidebar } from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useLoaderData } from "react-router-dom";

const WebsiteSeller = () => {
  const { profile, products, reviews } = useLoaderData();

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex gap-4 pb-16">
          <div className="basis-1/4">
            <WbSellerSidebar profile={profile} />
          </div>
          <div className="basis-3/4"></div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteSeller;

// Loader function starts ------
export const loader = async ({ params }) => {
  const { slug } = params;

  try {
    const response = await customFetch.get(`/posts/seller-profile/${slug}`);
    const profile = response.data.data.rows[0];
    const products = response.data.products.rows;
    const reviews = response.data.reviews.rows;

    return { profile, products, reviews };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
