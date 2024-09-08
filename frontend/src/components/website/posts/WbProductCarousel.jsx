import furniture_1 from "@/assets/carousel/furniture-1.jpg";
import furniture_2 from "@/assets/carousel/furniture-2.jpg";
import furniture_3 from "@/assets/carousel/furniture-3.jpg";
import furniture_4 from "@/assets/carousel/furniture-4.jpg";
import furniture_5 from "@/assets/carousel/furniture-5.jpg";
import furniture_6 from "@/assets/carousel/furniture-6.jpg";
import furniture_7 from "@/assets/carousel/furniture-7.jpg";
import furniture_8 from "@/assets/carousel/furniture-8.jpg";
import { useRef, useState } from "react";

const images = [
  {
    original: furniture_1,
    thumbnail: furniture_1,
  },
  {
    original: furniture_2,
    thumbnail: furniture_2,
  },
  {
    original: furniture_3,
    thumbnail: furniture_3,
  },
  {
    original: furniture_4,
    thumbnail: furniture_4,
  },
  {
    original: furniture_5,
    thumbnail: furniture_5,
  },
  {
    original: furniture_6,
    thumbnail: furniture_6,
  },
  {
    original: furniture_7,
    thumbnail: furniture_7,
  },
  {
    original: furniture_8,
    thumbnail: furniture_8,
  },
];

const WbProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(Number(index));
  };

  return (
    <div className="flex flex-col">
      <div className="h-[400px] w-[520px] flex justify-center items-center overflow-hidden">
        <img
          src={images[currentIndex].original}
          alt={import.meta.env.VITE_APP_TITLE}
          className="object-cover"
        />
      </div>

      <div className="flex flex-row flex-wrap justify-start items-center gap-2 mt-2 overflow-hidden">
        {images.map((thumb, index) => {
          return (
            <div
              key={index + 1}
              className={`w-20 h-20 flex justify-center items-center cursor-pointer overflow-hidden`}
              onClick={() => handleClick(index)}
            >
              <img
                src={thumb.thumbnail}
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
