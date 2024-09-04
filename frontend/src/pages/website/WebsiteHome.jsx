import {
  WbHeroSection,
  WbHomeFeaturedItems,
  WbHomeRecentItems,
  WbProductCardSkeleton,
  WbTopSellers,
} from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useLoaderData, useNavigation } from "react-router-dom";
import topBanner from "@/assets/website/img/cta/cta-img.png";
import banner2Img from "@/assets/website/img/common/banner_scnd.jpeg";
import secBannerImg from "@/assets/website/img/common/men-women.png";
import { Separator } from "@/components/ui/separator";

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

      <WbHomeFeaturedItems featuredData={featuredData} />

      {/* Top static banner starts ------ */}
      <section className="cta-area">
        <div className="container">
          <div className="bg-darkGreen cta-area-bg rounded-lg">
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
        </div>
      </section>
      {/* Top static banner ends ------ */}

      <WbHomeRecentItems recentData={recentData} />

      <WbTopSellers />

      <section className="mt-[110px]">
        <div className="container">
          <div
            className={`cta-wrapper relative rounded-lg bg-[url('@/assets/website/img/common/banner_scnd.jpeg')]`}
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
                  <a href="contact.html" className="cta-btn-link">
                    Get Started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                    >
                      <path
                        d="M9 9L13 5M13 5L9 1M13 5L1 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <img
                    src={secBannerImg}
                    className="cta-people position-absolute d-none d-lg-block"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
