import { WbProductCard, WbSectionTitle } from "@/components";

const WbHomeRecentItems = ({ recentData }) => {
  return (
    <section className="sm:py-5 md:py-10 sm:mt-5 md:mt-10">
      <div className="container">
        <WbSectionTitle
          title={`Recent Products`}
          description={`Get some recent products`}
          href={`/products/recent`}
        />
        <div className="grid md:grid-cols-5 gap-2">
          {recentData?.map((product) => {
            return <WbProductCard key={product.slug} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default WbHomeRecentItems;
