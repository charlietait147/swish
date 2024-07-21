import Image from "next/image";
import description from "../public/images/swish-description.jpeg";
import hero from "../public/images/hero-image.jpg";
function Hero() {
  return (
    <div>
      <div className="md:flex flex-row">
        <Image
          src={hero}
          alt="Four coffees clinking"
          className="relative md:w-1/2"
        />
        <h2 className="absolute top-32 left-8 text-white font-bold text-2xl">Swish .</h2>
        <div className="pt-6 pb-4 px-4 md:flex flex-col justify-center md:px-8">
          <div className=" border border-gray-200 shadow-lg">
            <Image src={description} alt="Google made swish description" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
