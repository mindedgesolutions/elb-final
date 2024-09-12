import { Quote, Star } from "lucide-react";
import { useRef } from "react";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import testimonial from "@/assets/website/img/testimonial/au-1.png";
import { WbSectionTitle, WbSectionWrapper } from "@/components";

const WbTestimonials = () => {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const sliderRef = useRef(null);

  let imageArr = [];
  {
    numbers.map((i, index) => {
      const el = (
        <div className="swiper-slide" key={index + 1}>
          <div className="rounded-lg border-2 bg-white border-gray-100 transition duration-500 hover:border-b hover:border-b-fuchsia-700 hover:shadow-2xl">
            <div className="testimonial-content p-4">
              <div className="flex gap-3 justify-start items-center">
                <span className="basis-1/5 bg-gray-200 p-3 flex justify-center items-center rounded-full">
                  <Quote className="rotate-180 fill-black font-normal" />
                </span>
                <span className="basis-4/5 text-[16px] font-medium testimonial-title">
                  Very solid!!
                </span>
              </div>
              <p className="text-sm testimonial-feedback text-justify tracking-tighter">
                There are many variations of a passages of Lorem Ipsum
                available, but the as majority have suffered alteration in some
                form.
              </p>
            </div>
            <div className="testimonial-meta d-flex align-items-center justify-content-between">
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <img
                    src={testimonial}
                    className="testimonial-author-img"
                    alt={import.meta.env.VITE_APP_TITLE}
                  />
                </div>
                <div>
                  <h4 className="testimonial-author-name fw-semibold">
                    Black Marvin
                  </h4>
                  <p className="testimonial-author-title">Nursing Assistant</p>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => {
                  return (
                    <Star
                      key={index + 1}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
      imageArr.push(el);
    });
  }

  return (
    <WbSectionWrapper>
      <div className="flex justify-center items-center">
        <WbSectionTitle
          title={`testimonials`}
          description={`Real Stories from Our Community`}
        />
      </div>
      <div className="swiper-wrapper">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          ref={sliderRef}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper md:h-[400px]"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {imageArr.map((img) => {
            return <SwiperSlide key={nanoid()}>{img}</SwiperSlide>;
          })}
        </Swiper>
      </div>
    </WbSectionWrapper>
  );
};
export default WbTestimonials;
