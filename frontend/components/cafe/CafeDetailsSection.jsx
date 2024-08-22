import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { addCafe, isCafeSaved } from "../../services/user.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
function CafeDetailsSection({ cafe }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("token");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (isLoggedIn && cafe) {
        try {
          const savedStatus = await isCafeSaved(cafe._id);
          setIsSaved(savedStatus);
        } catch (error) {
          console.error("Error checking saved status", error);
        }
      }
    };
    checkSavedStatus();
  }, [isLoggedIn, cafe]);

  const handleSaveCafe = async () => {
    if (isSaved) {
      router.push("/");
    } else {
      try {
        await addCafe(cafe._id);
        setIsSaved(true);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000); // Hide modal after 3 seconds
      } catch (error) {
        console.error("Error saving cafe", error);
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 xl:px-0 mt-16 mb-6 px-4">
      {showModal && (
        <div className="fixed top-3 right-2 bg-black border z-10 rounded-lg shadow-lg p-4 flex flex-row items-center gap-1">
          <span className="text-sm font-semibold text-white">
            Saved {cafe.name} to account
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {cafe && (
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="relative w-full lg:w-1/2 flex-shrink-0">
            <img
              src={`${process.env.NEXT_API_URL}/public/images/${cafe.image}`}
              alt={cafe.name}
              className="w-full h-auto object-cover rounded-lg"
            />
            {isLoggedIn && (
              <button
                onClick={handleSaveCafe}
                className={`absolute top-2 right-2 p-2 rounded-2xl border font-semibold flex flex-row gap-1 items-center text-sm ${
                  isSaved
                    ? "bg-black text-white border-black hover:text-white hover:bg-black underline"
                    : "bg-white text-black hover:bg-black hover:underline hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                    clipRule="evenodd"
                  />
                </svg>
                {isSaved ? "Saved" : "Save"}
              </button>
            )}
          </div>

          <div className="lg:w-1/2 flex flex-col gap-4 md:gap-5">
            <div className="flex flex-row justify-between md:flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
                {cafe.name}
              </h1>
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 mb-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className="text-sm font-semibold text-gray-600 pl-0.5">
                  {cafe.location}
                </p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg px-4 py-2 md:w-fit">
              <a
                href={cafe.website}
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 text-sm break-words md:text-base"
              >
                {cafe.website}
              </a>
            </div>
            {/* Icons Below Image on md+ screens */}
            <div className="hidden lg:flex flex-col gap-3">
              {cafe.icons &&
                cafe.icons.map((icon, index) => (
                  <div key={index} className="flex flex-row gap-2 items-center">
                    <img
                      src={`${process.env.NEXT_API_URL}/public/icons/${icon.url}`}
                      alt={icon.type}
                      className="w-12 h-12"
                    />
                    <p
                      key={index}
                      className="text-sm font-semibold text-gray-600"
                    >
                      {icon.type}
                    </p>
                  </div>
                ))}
            </div>
            <div className="rounded-md bg-gray-200 shadow-md px-4 py-2 lg:hidden">
              {cafe.description && (
                <p className="text-sm font-semibold text-gray-600 md:text-base">
                  <span className="font-extrabold">
                    {cafe.description.split(" ")[0]}
                  </span>
                  {` ${cafe.description.split(" ").slice(1).join(" ")}`}
                </p>
              )}
            </div>
            {/* Icons Here on Small Screens */}
            <div className="flex flex-col gap-4 lg:hidden">
              <div className="flex justify-center pt-2">
                <div className="border border-gray-300 w-11/12"></div>
              </div>
              {cafe.icons &&
                cafe.icons.map((icon, index) => (
                  <div key={index} className="flex flex-row gap-2 items-center">
                    <img
                      src={`${process.env.NEXT_API_URL}/public/icons/${icon.url}`}
                      alt={icon.type}
                      className="w-12 h-12"
                    />
                    <p
                      key={index}
                      className="text-sm font-semibold text-gray-600"
                    >
                      {icon.type}
                    </p>
                  </div>
                ))}
              <div className="flex justify-center pt-2">
                <div className="border border-gray-300 w-11/12"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Description on lg+ screens*/}
        <div className="hidden lg:inline-block lg:rounded-md mt-6 bg-gray-200 shadow-md px-4 py-2 ">
          {cafe.description && (
            <p className="text-sm font-semibold text-gray-600 md:text-base md:leading-7">
              <span className="font-extrabold">
                {cafe.description.split(" ")[0]}
              </span>
              {` ${cafe.description.split(" ").slice(1).join(" ")}`}
            </p>
          )}
        </div>
    </div>
  );
}

export default CafeDetailsSection;
