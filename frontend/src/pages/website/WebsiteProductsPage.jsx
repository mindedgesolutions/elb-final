import { WbPageBanner, WbPageWrapper, WbPostFilter } from "@/components";

const WebsiteProductsPage = () => {
  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex flex-row gap-4">
          <WbPostFilter />
          <div className="basis-3/4 p-4 h-[1024px]">AAA</div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteProductsPage;
