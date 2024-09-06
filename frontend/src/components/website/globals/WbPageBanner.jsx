import defaultImg from "@/assets/website/img/common/breadcrumb-bg.png";

const WbPageBanner = ({ banner }) => {
  return (
    <section className="w-full relative">
      <img
        src={banner || defaultImg}
        className="h-72 object-cover"
        alt={import.meta.env.VITE_APP_TITLE}
      />
    </section>
  );
};
export default WbPageBanner;
