import { WbCustomBtn } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WbSectionTitle = ({
  title,
  description,
  href,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex sm:flex-col md:flex-row justify-between sm:items-start md:items-end p-2 sm:mb-5">
      <div className="flex flex-col">
        <h2 className="sm:text-2xl md:text-[40px] font-extrabold capitalize sm:tracking-normal md:tracking-widest sm:mb-2 md:mb-5">
          {title}
        </h2>
        {description && <p className="section-desc">{description}</p>}
      </div>
      {href || handlePrev || handleNext ? (
        !href ? (
          <div className="col-md-auto hidden md:block position-relative sm:mt-5 md:mt-10">
            <div className="carousel-button-group">
              <div className="flex gap-3">
                <button onClick={handlePrev} className="swiper-prev w-10 h-10">
                  <ChevronLeft />
                </button>
                <button onClick={handleNext} className="swiper-next w-10 h-10">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-auto mt-30 mt-md-0">
            <div className="d-flex justify-content-end">
              <WbCustomBtn href={href} title={`view more`} />
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default WbSectionTitle;
