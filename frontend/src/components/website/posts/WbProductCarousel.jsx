import furniture_1 from "@/assets/carousel/furniture-1.jpg";
import furniture_2 from "@/assets/carousel/furniture-2.jpg";
import furniture_3 from "@/assets/carousel/furniture-3.jpg";
import furniture_4 from "@/assets/carousel/furniture-4.jpg";
import furniture_5 from "@/assets/carousel/furniture-5.jpg";
import furniture_6 from "@/assets/carousel/furniture-6.jpg";
import furniture_7 from "@/assets/carousel/furniture-7.jpg";
import furniture_8 from "@/assets/carousel/furniture-8.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useLoaderData } from "react-router-dom";

const WbProductCarousel = () => {
  const { product } = useLoaderData();
  const master = product.master.rows[0];
  const images = product.images.rows;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const captionsRef = useRef(null);
  const zoomRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const handleClick = (index) => {
    setCurrentIndex(Number(index));
  };

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLast = currentIndex === images.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const originals = [];
  images.map((img) => {
    const src = `${import.meta.env.VITE_BASE_URL}/${img.image_path}`;
    originals.push({ src: src, title: master.title });
  });

  return (
    <div className="flex flex-col">
      <div className="sm:h-[250px] md:h-[400px] sm:w-full md:w-[520px] relative flex justify-center items-center overflow-hidden group">
        <img
          src={`${import.meta.env.VITE_BASE_URL}/${
            images[currentIndex].image_path
          }`}
          alt={import.meta.env.VITE_APP_TITLE}
          className="h-full object-cover cursor-pointer"
          onClick={() => setOpen(true)}
        />
        {/* Lightbox starts ------ */}
        <Lightbox
          plugins={[Captions, Fullscreen, Counter, Zoom, Thumbnails]}
          captions={{ ref: captionsRef }}
          counter={{ container: { style: { top: "unset", bottom: 0 } } }}
          zoom={{ ref: zoomRef }}
          inline={{
            style: { width: "100%", maxWidth: "900px", aspectRatio: "3 / 2" },
          }}
          thumbnails={{ ref: thumbnailsRef }}
          on={{
            click: () => {
              (captionsRef.current?.visible
                ? captionsRef.current?.hide
                : captionsRef.current?.show)?.();
            },
            click: () => {
              (thumbnailsRef.current?.visible
                ? thumbnailsRef.current?.hide
                : thumbnailsRef.current?.show)?.();
            },
          }}
          open={open}
          close={() => setOpen(false)}
          slides={originals}
        />
        {/* Lightbox ends ------ */}
        <div className="absolute w-full flex justify-between">
          <ChevronLeft
            className="text-white top-0.5 w-12 h-12 cursor-pointer"
            onClick={goToPrevious}
          />
          <ChevronRight
            className="text-white top-0.5 w-12 h-12 cursor-pointer"
            onClick={goToNext}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-start items-center gap-2 mt-4 overflow-hidden">
        {images.map((thumb, index) => {
          return (
            <div
              key={index + 1}
              className={`w-20 h-20 flex justify-center items-center cursor-pointer overflow-hidden`}
              onClick={() => handleClick(index)}
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${thumb.image_path}`}
                alt={import.meta.env.VITE_APP_TITLE}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WbProductCarousel;
