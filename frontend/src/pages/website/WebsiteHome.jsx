import { WbHeroSection, WbHomeFeaturedItems } from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useLoaderData } from "react-router-dom";

const WebsiteHome = () => {
  document.title = `Welcome to Easy Lending Buddy | ${
    import.meta.env.VITE_APP_TITLE
  }`;
  const { featuredData } = useLoaderData();

  return (
    <>
      <WbHeroSection />
      <WbHomeFeaturedItems featuredData={featuredData} />
    </>
  );
};
export default WebsiteHome;

// Loader function starts ------
export const loader = async () => {
  try {
    const featured = await customFetch.get(`/website/featured-products`);
    const featuredData = featured.data.data.rows;

    return { featuredData };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
