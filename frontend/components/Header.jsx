import Image from "next/image";
import Logo from "../public/logo/swish-logo.png";
import NavBar from "./NavBar";

function Header() {
  return (
    <>
      <header className="h-14 bg-orange-500 flex justify-end items-center px-4">
        <NavBar />
      </header>
      <div className="h-20 w-40 bg-white absolute top-6 flex flex-row items-center shadow-lg ml-7">
        <Image src={Logo} alt="Swish Logo" width={75} height={75} />
        <h1 className="text-2xl font-bold absolute right-4 tracking-wide">
          Swish .
        </h1>
      </div>
    </>
  );
}

export default Header;
