import Image from "next/image";
import description from "../public/images/swish-description.jpeg";
import hero from "../public/images/hero-image.jpg";
import Reveal from "./Reveal";

function Hero() {
  return (
    <section className="overflow-hidden bg-orange-100 md:flex xl:items-center xl:justify-center xl:gap-16 xl:px-16 xl:py-12">
      <Reveal direction="left" className="md:w-1/2 xl:w-auto xl:shrink-0">
        <Image
          src={hero}
          alt="Four coffees clinking"
          // Trim the top of the photo (mostly arm) while keeping all the coffees in view
          className="w-full h-auto aspect-[1400/1360] object-cover object-bottom xl:h-[40rem] xl:w-auto xl:rounded-2xl xl:shadow-xl"
          priority
          sizes="(min-width: 1280px) 660px, (min-width: 768px) 50vw, 100vw"
        />
      </Reveal>
      <div className="flex items-center justify-center px-4 py-10 sm:px-10 md:w-1/2 lg:px-12 xl:w-auto xl:flex-1 xl:max-w-[34rem] xl:px-0 xl:py-0">
        <Reveal direction="zoom" delay={200} className="w-full max-w-xl">
          <div className="rounded-2xl bg-white p-3 shadow-xl sm:p-5">
            <Image
              src={description}
              alt="Google made swish description"
              className="w-full h-auto rounded-xl"
              sizes="(min-width: 1280px) 544px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
