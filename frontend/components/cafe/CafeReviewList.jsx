import CafeReviewCard from "./CafeReviewCard";

function CafeReviewList({ cafe }) {
    const reviewCount = cafe.reviews.length;
  return (
    <div className="container mx-auto px-4 pb-4 ">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <p className="text-sm font-semibold text-gray-400 pb-3">{reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}</p>
      <div className="flex flex-col gap-4">
        {cafe.reviews.map((review) => 
        <CafeReviewCard key = {review._id} review = {review}/>
        )}
      </div>
    </div>
  );
}

export default CafeReviewList;
