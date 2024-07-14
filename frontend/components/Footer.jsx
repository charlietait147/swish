"use client";
import { useState, useEffect   } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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
    // window.location.reload();

  };



  return (
    <footer className="px-6 pt-8 pb-4 bg-orange-500">
      <div className="border border-t-white mb-8"></div>
      <h1 className="text-white text-2xl font-bold mb-6 text-center">
        Swish .
      </h1>
      <ul className="flex flex-col text-center mb-4 ">
        <li className="text-white py-2">Discover</li>
        <li className="text-white py-2">Contact Us</li>
        {!isLoggedIn ? (
          <li className="text-white py-2">Sign In</li>
        ) : (
          <>
            <li className="text-white py-2">My Account</li>
            <li className="text-white py-2" onClick={handleSignOut}>Sign Out</li>
          </>
        )}
      </ul>
      <div className="border border-t-white mb-4"></div>
      <small className="text-gray-200">
        &copy; 2024 Swish .&nbsp; |&nbsp; All rights reserved
      </small>
    </footer>
  );
}

export default Footer;
