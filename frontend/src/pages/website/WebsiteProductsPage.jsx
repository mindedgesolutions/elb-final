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
import { Link, useLoaderData, useNavigation } from "react-router-dom";

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
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-[350px] p-2 md:p-4 rounded-sm">
            <WbPostFilter />
          </div>
          <div className="w-full md:basis-4/5">
            <WbPostSorting />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {posts?.length === 0 ? (
                <>
                  <h3 className="text-3xl font-medium col-span-2 md:col-span-4 tracking-widest">
                    Oops!... There's no post yet!
                  </h3>
                  <p className="col-span-2 md:col-span-4 tracking-widest">
                    We've ton of other products, I'm sure you will find one
                  </p>
                  <span className="col-span-2 md:col-span-4 tracking-widest font-medium text-purple-500 hover:text-purple-600">
                    <Link to={`/products/all`}>Keep browsing ...</Link>
                  </span>
                </>
              ) : (
                posts?.map((post) => {
                  return <WbProductCard key={post.id} product={post} />;
                })
              )}
            </div>
          </div>
        </div>
        {meta?.totalPages > 1 && (
          <div className="flex pb-8">
            <div className="hidden md:block md:basis-1/5">&nbsp;</div>
            <div className="w-full md:basis-4/5">
              <WbPaginationContainer />
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
