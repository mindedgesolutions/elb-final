import { WbPageBanner, WbPageWrapper, WbPostFilter } from "@/components";

const WebsiteProductsPage = () => {
  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex flex-row gap-4">
          <WbPostFilter />
          <div className="basis-3/4 p-4"></div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteProductsPage;

// Loader function starts ------
export const loader = ({ params }) => {
  return null;
};
