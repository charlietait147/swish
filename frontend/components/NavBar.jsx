"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    // localStorage.remove("token");
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <div className="burger-menu mr-3" onClick={toggleMenu}>
        <div className="h-5 w-5 flex flex-col justify-between cursor-pointer">
          <div className="h-1 w-full bg-white"></div>
          <div className="h-1 w-full bg-white"></div>
          <div className="h-1 w-full bg-white"></div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 backdrop-blur-sm"
            onClick={toggleMenu} // Close the menu when clicking on the overlay
          ></div>

          {/* Flyout Menu */}
          <div className="fixed top-0 right-0 z-50 h-screen p-5 overflow-y-auto bg-white w-64 dark:bg-gray-800 transition-transform transform duration-300 ease-in-out shadow-2xl">
            <button
              type="button"
              aria-controls="drawer-navigation"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleMenu}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            <h1 className="text-2xl font-bold pt-4">Swish .</h1>
            <div className="border border-t-gray-300 mt-4"></div>
            <ul className="mt-6 space-y-5 text-center">
              <li className="text-white py-2 bg-orange-500 hover:bg-orange-400 shadow-lg">
                Discover
              </li>
              <li className="text-white py-2 bg-orange-500 hover:bg-orange-400 shadow-lg">
                Contact Us
              </li>
              <div className="border border-t-gray-300 mt-6"></div>
              {!isLoggedIn ? (
                <>
                  <li className="text-white py-2 bg-gray-800  hover:bg-gray-600  shadow-lg flex items-center justify-center">
                    Sign In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </li>
                  <li className="text-white py-2 flex items-center justify-center bg-gray-800 hover:bg-gray-600 shadow-lg">
                    Register
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-white py-2 bg-gray-800  hover:bg-gray-600  shadow-lg">
                    My Account
                  </li>
                  <li
                    className="text-white py-2 bg-gray-800  hover:bg-gray-600  shadow-lg"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
