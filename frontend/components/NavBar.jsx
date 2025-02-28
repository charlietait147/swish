"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import { fetchUserData } from "../services/user.service.jsx";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [avatarUrl, setAvatarUrl] = useState(null); // Store the avatar URL
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     setIsLoggedIn(true);

  //     fetchUserData()
  //     .then((userData) => {
  //       setAvatarUrl(userData.avatar); // Assuming the avatar URL is part of the user data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  //   }
  //   setisLoading(false)
  // }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  //   fetchUserData()
  //   .then((userData) => {
  //     setAvatarUrl(userData.avatar); // Assuming the avatar URL is part of the user data
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching user data:", error);
  //   });
  // }
  // setisLoading(false)

  const getUserData = async () => {
    try {
      const response = await fetchUserData();
      setUserData(response);
      console.log(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSignOut = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("savedCafe_")) {
        localStorage.removeItem(key);
      }
    });
    router.push("/login");
  };

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <>
      <div
        className="burger-menu mr-3 md:hidden"
        role="button"
        aria-label="burger menu"
        onClick={toggleMenu}
      >
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
          <div className="fixed top-0 right-0 z-50 h-screen p-5 overflow-y-auto bg-white w-64 dark:bg-gray-800 transition-transform transform duration-300 ease-in-out shadow-2xl xs:w-72">
            <button
              type="button"
              aria-controls="drawer-navigation"
              aria-label="close menu"
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
            <ul className="mt-6 space-y-5 text-center" role="menu">
              <Link
                href="/"
                className="text-white py-2 bg-orange-500 hover:bg-orange-400 shadow-lg flex items-center justify-center"
              >
                Home
              </Link>
              <Link
                href="/discover"
                className="text-white py-2 bg-orange-500 hover:bg-orange-400 shadow-lg flex items-center justify-center"
              >
                Discover
              </Link>
              <Link
                href="/#contact-form"
                className="text-white py-2 bg-orange-500 hover:bg-orange-400 shadow-lg flex items-center justify-center"
              >
                Contact Us
              </Link>
              <div className="border border-t-gray-300 mt-6"></div>
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="text-white py-2 bg-gray-800  hover:bg-gray-600  shadow-lg flex items-center justify-center"
                  >
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
                  </Link>
                  <Link
                    href="/register"
                    className="text-white py-2 flex items-center justify-center bg-gray-800 hover:bg-gray-600 shadow-lg"
                  >
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
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/account"
                    className="text-white py-2 bg-gray-800  hover:bg-gray-600  shadow-lg flex items-center justify-center"
                  >
                    My Account
                  </Link>
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
      <ul className="hidden md:flex flex-row items-center md:gap-1">
        <Link
          href="/"
          className="text-sm  text-white py-2 px-4 rounded-3xl hover:bg-orange-400 cursor-pointer"
        >
          Home
        </Link>
        <Link
          href="/discover"
          className="text-sm  text-white py-2 px-4 rounded-3xl hover:bg-orange-400 cursor-pointer"
        >
          Discover
        </Link>
        <Link
          href="/#contact-form"
          className="text-sm  text-white py-2 px-4 rounded-3xl hover:bg-orange-400 cursor-pointer  "
        >
          Contact Us
        </Link>
        <span className="h-0.5 bg-gray-200 w-6 transform rotate-90 mr-1"></span>
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="text-sm  text-white py-2 px-4 rounded-3xl bg-orange-400 hover:bg-orange-500 cursor-pointer r"
            >
              Sign in
            </Link>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 text-white cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg> */}
          </>
        ) : (
          <>
            {/* <Link
              href="/account"
              className="text-white text-sm  hover:underline hover:underline-offset-8 mr-5 "
            >
              My Account
            </Link>
            <li
              className="bg-white text-sm  text-black py-2 px-4 rounded-3xl hover:bg-black hover:text-white cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </li> */}
            <AccountMenu
              handleSignOut={handleSignOut}
              avatarUrl={userData.avatar}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default NavBar;
