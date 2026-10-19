import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import CafeImageSlideshow from "./CafeImageSlideshow";

// Gallery size at which the "Show all photos" button appears
const SHOW_ALL_MIN_PHOTOS = 4;

// Spans for the smaller tiles so they always fill the 2x2 block beside the
// featured image on md+ screens, however many there are
const smallTileClasses = (i, count) => {
  // On mobile tiles sit two per row, so a lone last tile stretches across
  const mobile = count % 2 === 1 && i === count - 1 ? "col-span-2" : "col-span-1";

  let desktop = "md:col-span-1 md:row-span-1";
  if (count === 1) desktop = "md:col-span-2 md:row-span-2";
  else if (count === 2 || (count === 3 && i === 0)) desktop = "md:col-span-2 md:row-span-1";

  return `${mobile} ${desktop}`;
};

function CafeImageGallery({ cafe }) {
  const [showSlideshow, setShowSlideshow] = useState(false);

  // The first image is already shown at the top of the page
  const galleryImages = cafe?.images?.slice(1) || [];

  if (galleryImages.length === 0) return null;

  const [featuredImage, ...smallImages] = galleryImages;

  return (
    <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 lg:pt-6 xl:px-0 px-4 pb-6">
      <h3 className="text-xl font-semibold pb-3">Image Gallery</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px] gap-2 md:gap-3">
        <div
          className={`relative col-span-2 row-span-2 overflow-hidden rounded-lg ${
            smallImages.length === 0 ? "md:col-span-4" : ""
          }`}
        >
          <Image
            src={`${process.env.NEXT_API_URL}/public/images/${featuredImage}`}
            alt={`${cafe.name} photo 2`}
            fill
            sizes="(min-width: 768px) 512px, 100vw"
            className="object-cover"
          />
        </div>
        {smallImages.map((image, i) => (
          <div
            key={image}
            className={`relative overflow-hidden rounded-lg ${smallTileClasses(
              i,
              smallImages.length
            )}`}
          >
            <Image
              src={`${process.env.NEXT_API_URL}/public/images/${image}`}
              alt={`${cafe.name} photo ${i + 3}`}
              fill
              sizes="(min-width: 768px) 256px, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {galleryImages.length >= SHOW_ALL_MIN_PHOTOS && (
        <div className="flex justify-center md:justify-end pt-4">
          <button
            onClick={() => setShowSlideshow(true)}
            className="flex flex-row items-center gap-1.5 border border-black rounded-lg px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Show all photos
          </button>
        </div>
      )}
      {showSlideshow && (
        <CafeImageSlideshow cafe={cafe} onClose={() => setShowSlideshow(false)} />
      )}
    </div>
  );
}

CafeImageGallery.propTypes = {
  cafe: PropTypes.object,
};

export default CafeImageGallery;
