import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import spiltCoffeeBeans from "../public/images/spilt-coffee-beans.jpg";

export default function NotFound() {
  return (
    <div>
      <Header />
      {/* Background matches the photo's backdrop so the image blends into the page */}
      <div className="bg-[#fcf3ec]">
        <div className="max-width mx-auto flex flex-col gap-10 px-8 py-12 sm:px-12 md:flex-row md:items-center md:gap-12 md:px-14 md:py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 md:w-2/5 lg:gap-6">
            <h1 className="text-4xl font-bold text-orange-600 lg:text-6xl">
              Oops!
            </h1>
            <p className="text-sm text-orange-600 lg:text-base">
              The page you are looking for does not exist or has been moved.
              Here are some useful links:
            </p>
            <div className="flex flex-col gap-4 lg:gap-5">
              <Link href="/">
                <button className="text-sm sm:text-base bg-transparent text-orange-600 border border-orange-600 rounded-2xl px-4 py-2 w-min hover:bg-orange-600 hover:text-white">
                  Home
                </button>
              </Link>
              <Link href="/discover">
                <button className="text-sm sm:text-base bg-transparent text-orange-600 border border-orange-600 rounded-2xl px-4 py-2 w-min hover:bg-orange-600 hover:text-white">
                  Discover
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-3/5">
            <Image
              src={spiltCoffeeBeans}
              alt="Coffee cup spilling coffee beans"
              className="w-full h-auto fade-edges"
              priority
              sizes="(min-width: 1184px) 680px, (min-width: 768px) 60vw, 100vw"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
