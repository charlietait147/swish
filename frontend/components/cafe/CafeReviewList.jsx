import CafeReviewCard from "./CafeReviewCard";
import CafeReviewForm from "./CafeReviewForm";
import { useState, useEffect } from "react";
import Link from "next/link";

import Cookies from "js-cookie";

function CafeReviewList({ cafe, setReviewsUpdated }) {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const reviewCount = cafe.reviews.length;

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  return (
    <div className="container mx-auto px-4 pb-4 ">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <div className="flex flex-row justify-between pb-3">
        <p className="text-sm font-semibold text-gray-400 pb-3">
          {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
        </p>
        {!isLoggedIn ? (
          <>
          <Link href="/login">
            <div className="flex flex-row items-center gap-1">
              <p className="text-xs font-semibold text-orange-500 hover:underline">
                Sign in to add a review
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-orange-500 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            </Link>
          </>
        ) : (
          <button
            onClick={handleOpenReviewForm}
            className="bg-orange-500 text-white text-sm px-4 py-2  rounded-lg flex flex-row items-center hover:bg-orange-600"
          >
            Add a review
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {cafe.reviews.map((review) => (
          <CafeReviewCard key={review._id} review={review} />
        ))}
      </div>
      {openReviewForm && (
        <CafeReviewForm
          cafeId={cafe._id}
          cafeName={cafe.name}
          onClose={() => {
            setOpenReviewForm(false);
          }}
          setReviewsUpdated={setReviewsUpdated}
        />
      )}
    </div>
  );
}

export default CafeReviewList;
