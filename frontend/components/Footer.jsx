"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  };

  return (
    <footer className="px-6 pt-8 pb-4 bg-orange-500">
      <div className="max-width mx-auto">
      <div className="border border-t-white mb-8"></div>
      <div className="md:flex flex-row pb-4 md:justify-center md:gap-16 md:py-8">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Swish .
        </h1>
        <ul className="flex flex-col text-center mb-4 ">
          <Link href="/" className="text-white py-2">Home</Link>
          <Link href="/discover" className="text-white py-2">Discover</Link>
          <Link href="/#contact-form" className="text-white py-2">Contact Us</Link>
        </ul>
          {!isLoggedIn ? (
            <ul className="flex flex-col text-center">
            <Link href="/login" className="text-white py-2">Sign In</Link>
            <Link href="/register" className="text-white py-2">Register</Link>
            </ul>
          ) : (
            <>
              <ul className="flex flex-col text-center">
              <Link href="/account" className="text-white py-2">My Account</Link>
              <li className="text-white py-2 cursor-pointer" onClick={handleSignOut}>
                Sign Out
              </li>
              </ul>
            </>
          )}
      </div>
      <div className="border border-t-white mb-4"></div>
      <small className="text-gray-200">
        &copy; 2024 Swish .&nbsp; |&nbsp; All rights reserved
      </small>
      </div>
    </footer>
  );
}

export default Footer;
