import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";


export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="bg-not-found bg-cover bg-center h-screen flex flex-col gap-6 py-36 px-4 sm:px-8 md:px-10 md:gap-8 lg:items-center lg:justify-center lg:gap-10">
        <h1 className="text-4xl font-bold text-orange-600 lg:text-5xl md:pr-52  ">404 - Page Not Found</h1>
        <div className="flex flex-col gap-4 lg:items-center">
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
      <Footer />
    </div>
  );
}
