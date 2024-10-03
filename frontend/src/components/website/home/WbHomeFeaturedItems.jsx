import "react-multi-carousel/lib/styles.css";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { WbProductCard, WbSectionTitle, WbSectionWrapper } from "@/components";
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
    <WbSectionWrapper>
      <WbSectionTitle
        title={`featured products`}
        description={`Get some best-selling products`}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <div
        className="swiper #swiper-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          ref={sliderRef}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 4 },
            640: { slidesPerView: 2, spaceBetween: 5 },
            768: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 5, spaceBetween: 10 },
          }}
        >
          {featuredData?.map((product) => {
            return (
              <SwiperSlide key={nanoid()}>
                <WbProductCard product={product} type={`featured`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </WbSectionWrapper>
  );
};
export default WbHomeFeaturedItems;
