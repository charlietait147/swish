import Image from "next/image";
import coffeeBackground from "../public/images/coffee-background.jpg";
import slideshowImg1 from "../public/images/cafe-slideshow-1.jpg";
import slideshowImg2 from "../public/images/cafe-slideshow-2.jpg";
import slideshowImg3 from "../public/images/cafe-slideshow-3.jpg";
function CallToAction() {
  return (
    <>
      {/* <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 py-5 px-4">
        <div className="container mx-auto flex flex-col justify-center items-center gap-3">
          <h2 className="text-white text-2xl font-bold">Find Your Favourite Cafe</h2> */}
      {/* <button className="bg-white text-gray-800 text-sm px-4 py-2
          rounded-2xl  hover:bg-orange-600">
            Discover</button> */}
      {/* </div>
        </div> */}
      {/* <div className="relative w-full my-5">
        <Image
          src={coffeeBackground}
          alt="Coffee and book"
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 px-4 pt-10 bg-black bg-opacity-50  flex flex-col text-white  p-4">
          <h1 className="text-3xl font-semibold text-center">
            Find Your Favourite Cafe
          </h1>
        </div>
      </div> */}
      <div className="bg-gray-300 py-5  md:flex md:my-10">
        {/* <Image
          src={coffeeBackground}
          alt="Coffee and book"
          className="w-full h-full object-cover md:w-1/2"
          priority={true}
        /> */}
        <div className="flex flex-col gap-5 items-center md:justify-center px-4 md:w-1/2 md:items-start md:px-6">
          <h1 className="text-3xl font-semibold mt-4 text-center md:text-left">
            Find Your Favourite Cafe
          </h1>
          <button className="bg-black text-white rounded-2xl px-4 py-2 w-min hover:bg-gray-800">
            Discover
          </button>
        </div>
        <div className="flex items-center pt-10 px-2 gap-1 md:w-3/4 md:px-6 overflow-hidden ">
          <Image
            src={slideshowImg1}
            className="w-1/2 border-white off-screen-left rounded-lg shadow-md "
            alt="cafe"
          />
          <Image
            src={slideshowImg2}
            className="w-1/2 border-white off-screen-right rounded-lg shadow-md md:translate-x-0"
            alt="cafe"
          />
        </div>
      </div>
    </>
  );
}

export default CallToAction;
