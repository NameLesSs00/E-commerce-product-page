import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nextIcon from "@/public/icon-next.svg";
import prevIcon from "@/public/icon-previous.svg";

type ImageSliderProps = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[230px] overflow-hidden ">
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute  w-[100%] h-[100%] object-cover"
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 w-full flex justify-between px-4 transform -translate-y-1/2">
        <button
          onClick={handlePrev}
          className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <img src={prevIcon.src} alt="Previous" className="w-3 h-3" />
        </button>
        <button
          onClick={handleNext}
          className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <img src={nextIcon.src} alt="Next" className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
