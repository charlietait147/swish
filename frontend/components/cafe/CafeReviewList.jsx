import CafeReviewCard from "./CafeReviewCard";

function CafeReviewList({ cafe }) {
  return (
    <div className="container mx-auto px-4 ">
      <h3 className="text-xl font-semibold pb-3">Reviews</h3>
      <div className="flex flex-col gap-4">
        {cafe.reviews.map((review) => 
        <CafeReviewCard review = {review}/>
        )}
      </div>
    </div>
  );
}

export default CafeReviewList;
