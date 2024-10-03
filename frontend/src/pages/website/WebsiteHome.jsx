import {
  WbCustomBtn,
  WbHeroSection,
  WbHomeFeaturedItems,
  WbHomeRecentItems,
  WbProductCardSkeleton,
  WbSectionWrapper,
  WbTestimonials,
  WbTopSellers,
} from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useLoaderData, useNavigation } from "react-router-dom";
import topBanner from "@/assets/website/img/cta/cta-img.png";

const WebsiteHome = () => {
  document.title = `Welcome to Easy Lending Buddy | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { featuredData, recentData } = useLoaderData();

  if (isLoading) {
    return <WbProductCardSkeleton count={5} />;
  }

  return (
    <>
      <WbHeroSection />

      <div className="md:max-w-[1600px] mx-auto">
        <WbHomeFeaturedItems featuredData={featuredData} />

        {/* Top static banner starts ------ */}
        <WbSectionWrapper>
          <div className="bg-purple-950 p-16 rounded-lg">
            <div className="row align-items-center">
              <div className="col-12 col-xl-7">
                <div className="cta-content">
                  <p className="cta-subtitle fw-bold mb-2">
                    Transform your goals into achievements.{" "}
                  </p>
                  <h2 className="section-title-light fw-bold mb-4">
                    Seamless lending and borrowing - your gateway to financial
                    freedom!
                  </h2>
                  <p className="section-desc-light sm:mb-10 md:mb-40">
                    Join our revolutionizing platform to connect lenders and
                    borrowers. Achieve financial freedom and turn visions into
                    reality!
                  </p>
                </div>
                <div className="cta-counter sm:mt-2 md:mt-5">
                  <div className="cta-counter-item rounded-lg">
                    <h3 className="cta-counter-title fw-bold">
                      <span className="counter">950</span>
                      <span>M+</span>
                    </h3>
                    <p className="cta-counter-desc fw-bold">
                      Total Freelancers
                    </p>
                  </div>
                  <div className="cta-counter-item rounded-lg">
                    <h3 className="cta-counter-title fw-bold">
                      <span className="counter">32</span>
                      <span>M+</span>
                    </h3>
                    <p className="cta-counter-desc fw-bold">
                      Total Freelancers
                    </p>
                  </div>
                  <div className="cta-counter-item rounded-lg">
                    <h3 className="cta-counter-title fw-bold">
                      <span className="counter">120</span>
                      <span>M+</span>
                    </h3>
                    <p className="cta-counter-desc fw-bold">
                      Total Freelancers
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-5 mt-5 mt-xl-0">
                <div className="cta-img">
                  <img
                    src={topBanner}
                    className="img-fluid w-100 rounded-lg"
                    alt={import.meta.env.VITE_APP_TITLE}
                  />
                </div>
              </div>
            </div>
          </div>
        </WbSectionWrapper>
        {/* Top static banner ends ------ */}

        <WbHomeRecentItems recentData={recentData} />

        <WbTopSellers />

        {/* Bottom banner starts ------ */}
        <WbSectionWrapper>
          <div
            className={`w-full p-16 relative rounded-lg bg-[url('@/assets/website/img/common/banner_scnd.jpeg')]`}
          >
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div>
                  <h2 className="cta-subtitle fw-bold fw-bold mb-4">
                    Discover the Power of Connection
                  </h2>
                  <h2 className="section-title-light fw-bold mb-4">
                    Where Lending Meets Borrowing
                  </h2>
                  <p className="text-white mb-5">
                    Empower your future on our trusted platform. Seamless
                    lending, smart borrowing - where financial success and
                    opportunities unite
                  </p>
                  <WbCustomBtn
                    title={`get started`}
                    href={`/sign-up`}
                    customWidth="w-56"
                  />
                </div>
              </div>
              {/* <div className="col-lg-6">
              <div>
                <img
                  src={secBannerImg}
                  className="cta-people position-absolute d-none d-lg-block"
                  alt={import.meta.env.VITE_APP_TITLE}
                />
              </div>
            </div> */}
            </div>
          </div>
        </WbSectionWrapper>
        {/* Bottom banner ends ------ */}

        <WbTestimonials />
      </div>
    </>
  );
};
export default WebsiteHome;

// Loader function starts ------
export const loader = async () => {
  try {
    const featured = await customFetch.get(`/website/featured-products`);
    const featuredData = featured.data.data.rows;

    const recent = await customFetch.get(`/website/recent-products`);
    const recentData = recent.data.data.rows;

    return { featuredData, recentData };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};
