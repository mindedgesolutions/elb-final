import { WbSectionTitle, WbSellerCard } from "@/components";

const WbTopSellers = () => {
  return (
    <section className="sm:py-5 md:py-10 sm:mt-5 md:mt-10">
      <div className="container">
        <WbSectionTitle
          title={`top sellers`}
          description={`Meet the best of best sellers on our platform`}
          href={`/sellers`}
        />
        <div className="grid md:grid-cols-5 gap-2">
          {Array.from({ length: 5 }, (_, index) => {
            return <WbSellerCard key={index + 1} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default WbTopSellers;
