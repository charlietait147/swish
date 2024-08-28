import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="bg-not-found bg-cover bg-center h-screen flex flex-col gap-6 py-36 px-4 sm:px-8 md:px-10 md:gap-8 lg:items-center lg:justify-center lg:gap-10">
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="text-4xl font-bold text-orange-600 lg:text-5xl md:pr-52  ">
            404 - Page Not Found
          </h1>
          <p className="text-sm text-orange-600 lg:text-base md:pr-52 w-5/6">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col gap-4 lg:gap-5">
            <Link href="/">
              <button className="text-sm sm:text-base bg-transparent text-orange-600 border border-orange-600 rounded-2xl px-4 py-2 w-min hover:bg-orange-600 hover:text-white md:mr-48">
                Home
              </button>
            </Link>
            <Link href="/discover">
              <button className="text-sm sm:text-base bg-transparent text-orange-600 border border-orange-600 rounded-2xl px-4 py-2 w-min hover:bg-orange-600 hover:text-white md:mr-48">
                Discover
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
