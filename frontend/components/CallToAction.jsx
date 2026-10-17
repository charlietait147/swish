"use client";
import Image from "next/image";
import slideshowImg1 from "../public/images/cafe-slideshow-1.jpg";
import slideshowImg2 from "../public/images/cafe-slideshow-2.jpg";
import coffeeLaptopSignIn from "../public/images/cafe-sign-in.jpg";
import Link from "next/link";
import accountView from "../public/images/account-image.jpg";
import Cookies from "js-cookie";
import Reveal from "./Reveal";

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
    <>
      <section className="overflow-hidden bg-gray-300 px-4 py-10 md:flex md:items-center md:gap-10 md:px-10 lg:px-16 lg:py-16">
        <Reveal
          direction="left"
          className="flex flex-col gap-5 items-center md:w-2/5 md:items-start"
        >
          <h1 className="text-3xl font-semibold text-center md:text-left lg:text-4xl">
            Find Your Favourite Cafe
          </h1>
          <Link href="/discover">
            <button className="bg-black text-white rounded-2xl px-4 py-2 w-min hover:bg-gray-800">
              Discover
            </button>
          </Link>
        </Reveal>
        <div className="flex items-center pt-10 gap-3 md:w-3/5 md:pt-0 lg:gap-5">
          <Reveal direction="up" className="w-1/2">
            <Image
              src={slideshowImg1}
              className="w-full h-auto rounded-lg shadow-md"
              alt="cafe"
              sizes="(min-width: 768px) 30vw, 50vw"
            />
          </Reveal>
          <Reveal direction="up" delay={150} className="w-1/2">
            <Image
              src={slideshowImg2}
              className="w-full h-auto rounded-lg shadow-md"
              alt="cafe"
              sizes="(min-width: 768px) 30vw, 50vw"
            />
          </Reveal>
        </div>
      </section>
      <section className="overflow-hidden bg-orange-200 md:flex">
        <Reveal direction="left" className="md:w-1/2">
          <Image
            src={isLoggedIn ? accountView : coffeeLaptopSignIn}
            alt={
              isLoggedIn
                ? "Woman sitting with laptop"
                : "Coffee in front of Laptop"
            }
            className="w-full h-auto"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Reveal>
        <Reveal
          direction="right"
          delay={150}
          className="flex flex-col px-4 py-10 justify-center items-center gap-1 md:w-1/2 md:px-10"
        >
          {!isLoggedIn ? (
            <>
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Register an account
              </h2>
              <p className="text-sm font-light mt-1 text-gray-600 lg:text-base">
                To add reviews and save your favourite cafes
              </p>
              <Link href="/register">
                <button className="bg-black text-white rounded-2xl px-4 py-2 w-min mt-3 hover:bg-gray-800">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Manage your account
              </h2>
              <p className="text-sm font-light mt-2 text-gray-600 text-center lg:text-base">
                To edit your profile, view and delete saved cafes and manage
                your reviews
              </p>
              <Link href="/account">
                <button className="bg-black text-white rounded-2xl px-4 py-2 mt-3 hover:bg-gray-800">
                  My Account
                </button>
              </Link>
            </>
          )}
        </Reveal>
      </section>
    </>
  );
}

export default CallToAction;
