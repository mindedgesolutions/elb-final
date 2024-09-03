import "react-multi-carousel/lib/styles.css";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { WbProductCard } from "@/components";
import { useCallback, useRef } from "react";

const WbHomeFeaturedItems = ({ featuredData }) => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleMouseEnter = () => {
    sliderRef?.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    sliderRef?.current?.swiper?.autoplay?.start();
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex mb-10 justify-content-between align-items-end">
          <div className="flex flex-col">
            <h2 className="font-semibold section-title">Featured Products</h2>
            <p className="section-desc">Get some best-selling Products</p>
          </div>
          <div className="col-md-auto position-relative mt-10 mt-md-0">
            <div className="carousel-button-group">
              <div className="d-flex gap-3">
                <button
                  onClick={handlePrev}
                  className="recentJobPrev swiper-prev"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="recentJobNext swiper-next"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="swiper #swiper-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Swiper
            spaceBetween={25}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 3000 }}
            ref={sliderRef}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {featuredData.map((product) => {
              return (
                <SwiperSlide key={nanoid()}>
                  <WbProductCard product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default WbHomeFeaturedItems;
