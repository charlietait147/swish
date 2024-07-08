import CafeReviewCard from "./CafeReviewCard";
import CafeReviewForm from "./CafeReviewForm";
import { useState } from "react";

function CafeReviewList({ cafe }) {
  const reviewCount = cafe.reviews.length;
  const [openReviewForm, setOpenReviewForm] = useState(false);

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
        <button
          onClick={handleOpenReviewForm}
          className="bg-orange-500 text-white text-sm px-4 py-2  rounded-lg flex flex-row items-center hover:bg-orange-600"
        >
          Add a review
        </button>
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
        />
      )}
    </div>
  );
}

export default CafeReviewList;
