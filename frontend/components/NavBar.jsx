"use client";
import { useState, useEffect } from "react";
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="burger-menu mr-3" onClick={toggleMenu}>
        <div className="h-5 w-5 flex flex-col justify-between cursor-pointer">
          <div className="h-1 w-full bg-white"></div>
          <div className="h-1 w-full bg-white"></div>
          <div className="h-1 w-full bg-white"></div>
        </div>
        {isMenuOpen && (
          <ul className="text-center absolute top-10 right-4 z-10 bg-orange-500 shadow-lg px-2 border border-t-white mt-2 transition transform ease-in-out duration-300">
            <li className="text-white py-2">DISCOVER</li>
          </ul>
        )}
      </div>
      <div className="profile-menu" onClick={toggleProfile}>
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
        {isProfileOpen && (
          <ul className="text-center absolute top-10 right-4 z-10 bg-orange-500 shadow-lg px-2 border border-t-white mt-2 transition transform ease-in-out duration-300">
            {!isLoggedIn ? (
              <>
                <li className="text-white py-2">LOG IN</li>
                <li className="text-white py-2">REGISTER</li>
              </>
            ) : (
              <>
                <li className="text-white py-2" onClick={handleSignOut}>
                  MY ACCOUNT
                </li>
                <li className="text-white py-2" onClick={handleSignOut}>
                  SIGN OUT
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default NavBar;
