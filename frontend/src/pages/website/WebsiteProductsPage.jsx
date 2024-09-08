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
  const { posts, postMeta } = useLoaderData();
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
        <div className="flex flex-row gap-4">
          <WbPostFilter />
          <div className="basis-3/4">
            <WbPostSorting />
            <div className="grid md:grid-cols-4 gap-3">
              {posts?.map((post) => {
                return <WbProductCard key={post.id} product={post} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex mt-16">
          <div className="basis-1/4">&nbsp;</div>
          <div className="basis-3/4">
            {postMeta?.totalPages > 1 && <WbPaginationContainer />}
          </div>
        </div>
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
    const postMeta = response.data.meta;

    return { posts, postMeta };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
