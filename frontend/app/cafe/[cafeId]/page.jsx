"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchCafe } from "@/services/cafe.service";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CafePage() {
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cafeId } = useParams();

  const getCafe = async () => {
    if (cafeId) {
      try {
        const response = await fetchCafe(cafeId);
        setCafe(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCafe();
  }, []);

  return (
    <>
      <Header />

      <div className="container mx-auto mt-16 mb-6 px-4">
        {cafe && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/2">
              <img
                src={`${process.env.NEXT_API_URL}/public/images/${cafe.image}`}
                alt={cafe.name}
                className="w-full h-auto object-cover rounded-lg"
              />
               {/* <div className="absolute bottom-0 right-0 flex flex-row items-center  bg-orange-500 text-white p-2 rounded-tr-lg">
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
                <p className="text-sm font-semibold text-white pl-0.5">{cafe.location}</p>
              </div> */}
            </div>
           
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold">{cafe.name}</h1>
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
                <p className="text-sm font-semibold text-gray-600 pl-0.5">{cafe.location}</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg px-4 py-2">
                <a
                    href={cafe.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-500 text-sm break-words"
                >
                    {cafe.website}
                </a>
            </div>
            <div className="rounded-md bg-gray-200 shadow-md px-4 py-2">
              {cafe.description && (
                <p className="text-sm font-semibold text-gray-600">
                  <span className="font-extrabold">
                    {cafe.description.split(" ")[0]}
                  </span>
                  {` ${cafe.description.split(" ").slice(1).join(" ")}`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
