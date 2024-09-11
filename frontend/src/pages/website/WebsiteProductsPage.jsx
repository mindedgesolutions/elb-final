import {
  WbPageBanner,
  WbPageWrapper,
  WbPaginationContainer,
  WbPostFilter,
  WbPostSorting,
  WbProductCard,
  WbProductCardSkeleton,
} from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useLoaderData, useNavigation } from "react-router-dom";

const WebsiteProductsPage = () => {
  document.title = `All the Products we Offer! | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  const { posts, meta } = useLoaderData();
  window.scrollTo(0, 0);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return <WbProductCardSkeleton count={8} />;
  }

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex flex-row gap-4 mb-16">
          <div className="w-[350px] p-4 rounded-sm">
            <WbPostFilter />
          </div>
          <div className="basis-4/5">
            <WbPostSorting />
            <div className="grid md:grid-cols-4 gap-3">
              {posts?.map((post) => {
                return <WbProductCard key={post.id} product={post} />;
              })}
            </div>
          </div>
        </div>
        {meta?.totalPages > 1 && (
          <div className="flex pb-8">
            <div className="basis-1/5">&nbsp;</div>
            <div className="basis-4/5">
              && <WbPaginationContainer />
            </div>
          </div>
        )}
      </WbPageWrapper>
    </>
  );
};
export default WebsiteProductsPage;

// Loader function starts ------
export const loader = async ({ request }) => {
  const search = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await customFetch.get(`/website/posts`, {
      params: search,
    });
    const posts = response.data.data.rows;
    const meta = response.data.meta;

    return { posts, meta };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
