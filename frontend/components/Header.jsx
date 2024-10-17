import Image from "next/image";
// import Logo from "../public/logo/swish-logo.png";
import NavBar from "./NavBar";
import Link from "next/link";
import Logo from "../public/logo/swish-updated-logo.jpeg";

function Header() {
  return (
    <>
      <header className=" bg-orange-500 md:py-3 ">
        <div className="max-width mx-auto flex justify-between items-center px-4 h-14">
          {/* <Link href="/" className="flex flex-row gap-1 items-center">
            <Image src={Logo} className="h-12 w-12 md:h-14 md:w-14" alt="Swish Logo"></Image>
            <h1 className="text-white text-xl font-bold tracking-wide lg:text-xl">
              Swish .
            </h1>
          </Link> */}
          <Link href="/" className="flex flex-row items-center gap-2">
            <Image
              src={Logo}
              className="h-10 w-10 md:h-12 md:w-12"
              alt="Swish Logo"
            ></Image>
            <h1 className="text-white hidden sm:block sm:text-xl  font-semibold tracking-normal md:text-2xl">
              Swish .
            </h1>
          </Link>
          <NavBar />
        </div>
      </header>
      {/* <Link href="/" className="h-20 w-40 bg-white absolute top-6 flex flex-row items-center shadow-lg ml-7 z-10 lg:h-24 lg:w-52 xl:ml-20">
        <Image src={Logo} className="w-20 h-20 lg:w-24 lg:h-24"alt="Swish Logo"/>
        <h1 className="text-2xl font-bold absolute right-3 tracking-wide lg:text-3xl lg:right-6">
          Swish .
        </h1>
      </Link> */}
    </>
  );
}

export default Header;
