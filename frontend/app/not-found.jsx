import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";


export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="bg-not-found bg-cover bg-center h-screen flex flex-col gap-6 py-36 px-4 sm:px-8 md:px-10 lg:items-center lg:justify-center">
        <h1 className="text-4xl font-bold text-orange-500 lg:text-5xl md:pr-52  ">404 - Page Not Found</h1>
        <Link href="/discover">
          <button className="text-sm sm:text-base bg-transparent text-orange-500 border border-orange-500 rounded-2xl px-4 py-2 w-min hover:bg-orange-500 hover:text-white md:mr-48">
            Discover
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
