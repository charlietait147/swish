import Image from "next/image";
import Logo from "../public/logo/swish-logo.png";
import NavBar from "./NavBar";
import Link from "next/link";

function Header() {
  return (
    <>
      <header className=" bg-orange-500 lg:py-1">
        <div className="max-width mx-auto flex justify-end items-center px-4 h-14">
          <NavBar />
        </div>
      </header>
      <Link href="/" className="h-20 w-40 bg-white absolute top-6 flex flex-row items-center shadow-lg ml-7 z-10 lg:h-24 lg:w-52 xl:ml-20">
        <Image src={Logo} className="w-20 h-20 lg:w-24 lg:h-24"alt="Swish Logo"/>
        <h1 className="text-2xl font-bold absolute right-3 tracking-wide lg:text-3xl lg:right-6">
          Swish .
        </h1>
      </Link>
    </>
  );
}

export default Header;
