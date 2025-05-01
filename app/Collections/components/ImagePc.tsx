import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nextIcon from "@/public/icon-next.svg";
import prevIcon from "@/public/icon-previous.svg";
import Image from "next/image";

type ImageSliderProps = {
  images: string[];
  thumbnails: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images, thumbnails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
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

  const renderSlider = (isModal = false) => (
    <div
      className={`relative  ${isModal ? "h-[400px] w-[400px]" : "h-[350px] w-[330px] "} ${
        isModal ? "" : "cursor-pointer"
      }`}
      onClick={(e) => {
        if (!isModal) setIsModalOpen(true);
        e.stopPropagation(); // Prevents modal backdrop click
      }}
    >
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
          className="absolute w-full h-full object-cover rounded-lg"
          width={ 320}
          height={ 320}
        />
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute top-1/2 w-full flex justify-between px-4 transform -translate-y-1/2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className={`bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-gray-100 ${isModal ? "" : "hidden"} `}>
          <Image src={prevIcon} alt="Prev" width={12} height={12} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className={`bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-gray-100 ${isModal ? "" : "hidden"} `}
        >
          <Image src={nextIcon} alt="Next" width={12} height={12} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden sm:flex flex-col items-center gap-4">
        {renderSlider()}
        {/* Thumbnails */}
        <div className="flex gap-4">
          {thumbnails.map((thumb, i) => (
            <img
              key={i}
              src={thumb}
              alt={`Thumbnail ${i + 1}`}
              onClick={() => handleThumbnailClick(i)}
              className={`w-16 h-16 object-contain rounded-lg cursor-pointer transition-opacity ${
                currentIndex === i ? "opacity-100 ring-2 ring-orange-500" : "opacity-80"
              } hover:opacity-50`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)} // Close when clicking outside
          >
            <motion.div
              className="p-4 rounded-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
            >
              {renderSlider(true)}
              {/* Modal Thumbnails */}
              <div className="flex gap-4 mt-4 justify-center">
                {thumbnails.map((thumb, i) => (
                  <img
                    key={i}
                    src={thumb}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => handleThumbnailClick(i)}
                    className={`w-16 h-16 object-contain rounded-lg cursor-pointer transition-opacity ${
                      currentIndex === i ? "opacity-100 ring-2 ring-orange-500" : "opacity-80"
                    } hover:opacity-50`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageSlider;
