import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { disableScroll, enableScroll } from "@/utils/scroll";

// Minimum horizontal distance (px) a touch has to travel to count as a swipe
const SWIPE_THRESHOLD = 50;

function CafeImageSlideshow({ cafe, onClose }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const images = cafe.images;

  const nextImage = () => setIndex((i) => Math.min(i + 1, images.length - 1));
  const prevImage = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, images.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    if (distance < -SWIPE_THRESHOLD) nextImage();
    if (distance > SWIPE_THRESHOLD) prevImage();
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${cafe.name} photos`}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <div className="relative flex items-center justify-center px-4 py-4">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute left-4 flex flex-row items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          Close
        </button>
        <p className="text-sm font-semibold text-gray-600">
          {index + 1} / {images.length}
        </p>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 flex items-center justify-center px-4 pb-8 md:px-20"
      >
        <div className="relative w-full h-full max-w-screen-lg">
          <Image
            key={images[index]}
            src={`${process.env.NEXT_API_URL}/public/images/${images[index]}`}
            alt={`${cafe.name} photo ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            className="object-contain"
          />
          {/* Load the next image in the background so moving forward is instant */}
          {index < images.length - 1 && (
            <Image
              src={`${process.env.NEXT_API_URL}/public/images/${images[index + 1]}`}
              alt=""
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              loading="eager"
              className="hidden"
            />
          )}
        </div>

        {index > 0 && (
          <button
            onClick={prevImage}
            aria-label="Previous photo"
            className="absolute left-2 md:left-6 bg-orange-100 hover:bg-orange-200 rounded-full p-2 shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        {index < images.length - 1 && (
          <button
            onClick={nextImage}
            aria-label="Next photo"
            className="absolute right-2 md:right-6 bg-orange-100 hover:bg-orange-200 rounded-full p-2 shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

CafeImageSlideshow.propTypes = {
  cafe: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CafeImageSlideshow;
