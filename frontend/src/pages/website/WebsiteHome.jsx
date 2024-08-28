import WbHeroSection from "@/components/website/home/WbHeroSection";

const WebsiteHome = () => {
  document.title = `Welcome to Easy Lending Buddy | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  return (
    <>
      <WbHeroSection />
    </>
  );
};
export default WebsiteHome;
