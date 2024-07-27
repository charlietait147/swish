"use client";
import Image from "next/image";
import slideshowImg1 from "../public/images/cafe-slideshow-1.jpg";
import slideshowImg2 from "../public/images/cafe-slideshow-2.jpg";
import coffeeLaptopSignIn from "../public/images/cafe-sign-in.jpg";
import Link from "next/link";
import accountView from "../public/images/account-image.jpg";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";

function CallToAction() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <div className="bg-gray-300 my-6 py-5 md:flex md:my-10">
        <div className="flex flex-col gap-5 items-center md:justify-center px-4 md:w-1/2 md:items-start md:px-6">
          <h1 className="text-3xl font-semibold mt-4 text-center md:text-left">
            Find Your Favourite Cafe
          </h1>
          <Link href="/discover">
            <button className="bg-black text-white rounded-2xl px-4 py-2 w-min hover:bg-gray-800">
              Discover
            </button>
          </Link>
        </div>
        <div className="flex items-center pt-10 px-2 gap-1 md:w-3/4 md:px-6 overflow-hidden ">
          <Image
            src={slideshowImg1}
            className="w-1/2 border-white off-screen-left rounded-lg shadow-md "
            alt="cafe"
          />
          <Image
            src={slideshowImg2}
            className="w-1/2 border-white off-screen-right rounded-lg shadow-md md:translate-x-0"
            alt="cafe"
          />
        </div>
      </div>
      {!isLoggedIn ? (
        <div className="bg-orange-200 py-5 my-10 md:flex ">
          <Image
            src={coffeeLaptopSignIn}
            alt="Coffee in front of Laptop"
            className="px-4 md:w-1/2"
          />

          <div className="flex flex-col px-4 md:justify-center items-center md:w-1/2">
            <h2 className="text-3xl font-semibold mt-5">Register an account</h2>
            <p className="text-sm font-light mt-1 text-gray-600">
              To add reviews and save your favourite cafes
            </p>
            <Link href="/register">
              <button className="bg-black text-white rounded-2xl px-4 py-2 w-min mt-3 hover:bg-gray-800">
                Register
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-orange-200 py-5 my-6 md:flex ">
          <Image
            src={accountView}
            alt="Woman sitting with laptop"
            className="px-4 md:w-1/2"
          />
          <div className="flex flex-col px-4 md:justify-center items-center md:w-1/2">
            <h2 className="text-3xl font-semibold mt-5">Manage your account</h2>
            <p className="text-sm font-light mt-2 text-gray-600 md:text-center">
              To edit your profile, view and delete saved cafes and manage your
              reviews
            </p>
            <Link href="/account">
              <button className="bg-black text-white rounded-2xl px-4 py-2 mt-3 hover:bg-gray-800">
                My Account
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CallToAction;
