import { WbHeroSection, WbHomeFeaturedItems } from "@/components";

const WebsiteHome = () => {
  document.title = `Welcome to Easy Lending Buddy | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  return (
    <>
      <WbHeroSection />
      <WbHomeFeaturedItems />
    </>
  );
};
export default WebsiteHome;
