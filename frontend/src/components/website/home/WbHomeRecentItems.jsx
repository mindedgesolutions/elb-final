import { WbProductCard, WbSectionTitle, WbSectionWrapper } from "@/components";

const WbHomeRecentItems = ({ recentData }) => {
  return (
    <WbSectionWrapper>
      <WbSectionTitle
        title={`recent products`}
        description={`Get some recent products`}
        href={`/products/all`}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {recentData?.map((product) => {
          return <WbProductCard key={product.slug} product={product} />;
        })}
      </div>
    </WbSectionWrapper>
  );
};
export default WbHomeRecentItems;
