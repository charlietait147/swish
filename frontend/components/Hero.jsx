import Image from "next/image";
import description from "../public/images/swish-description.jpeg";
import hero from "../public/images/hero-image.jpg";

function Hero() {
  return (
    <div>
      <div className="md:flex flex-row relative ">
        <Image
          src={hero}
          alt="Four coffees clinking"
          className="md:w-1/2"
        />
        <h2 className="absolute top-16 left-4 text-white font-bold font-header text-3xl">Swish .</h2> 
        <div className="pt-5 pb-5 px-4 md:flex flex-col justify-center md:px-8">
          <div className=" border border-gray-200 shadow-lg">
            <Image src={description} alt="Google made swish description" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
