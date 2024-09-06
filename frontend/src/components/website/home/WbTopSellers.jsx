import { WbSectionTitle, WbSectionWrapper, WbSellerCard } from "@/components";

const WbTopSellers = () => {
  return (
    <WbSectionWrapper className={`bg-white`}>
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
    </WbSectionWrapper>
  );
};
export default WbTopSellers;
