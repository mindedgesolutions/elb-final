import { WbSectionTitle } from "@/components";

const WbHomeRecentItems = ({ recentData }) => {
  return (
    <section className="py-10">
      <div className="container">
        <WbSectionTitle
          title={`Recent Products`}
          description={`Get some recent products`}
          href={`/products/recent`}
        />
        <div className="swiper #swiper-container"></div>
      </div>
    </section>
  );
};
export default WbHomeRecentItems;
