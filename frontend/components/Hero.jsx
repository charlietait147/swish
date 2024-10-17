import Image from "next/image";
import description from "../public/images/swish-description.jpeg";
import hero from "../public/images/hero-image.jpg";

function Hero() {
  return (
    <>
      <div className="sm:flex flex-row relative mx-auto max-width lg:h-132 lg:mt-10">
        <Image
          src={hero}
          alt="Four coffees clinking"
          className="sm:w-1/2"
        />
        {/* <h2 className="absolute top-16 left-4 text-white font-bold font-header text-3xl">Swish .</h2>  */}
        <div className="pt-5 pb-5 px-4 sm:flex flex-col justify-center sm:px-8 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24">
          {/* <div className=" border border-gray-200 shadow-lg"> */}
            <Image src={description} alt="Google made swish description" />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Hero;
