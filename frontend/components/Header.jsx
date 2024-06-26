import Image from "next/image";
import Logo from "../public/logo/swish-logo.png";
function Header() {
  return (
    <>
      <header className="h-14 bg-orange-500 flex justify-end items-center relative px-4">
        <div className="burger-menu">
          <div className="h-5 w-5 flex flex-col justify-between cursor-pointer mr-3">
            <div className="h-1 w-full bg-white"></div>
            <div className="h-1 w-full bg-white"></div>
            <div className="h-1 w-full bg-white"></div>
          </div>
        </div>
        <div>
          <svg
            className="w-6 h-6 text-white "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </header>
      <div className="h-20 w-40 bg-white absolute top-6 flex flex-row items-center shadow-lg ml-7">
        <Image src={Logo} alt="Swish Logo" width={75} height={75} />
        <h1 className="text-2xl font-medium absolute right-4 tracking-wide">Swish .</h1>
      </div>
    </>
  );
}

export default Header;
