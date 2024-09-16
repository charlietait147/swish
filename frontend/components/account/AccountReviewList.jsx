import AccountReviewCard from "./AccountReviewCard";
import { useState, useEffect } from "react";
import Link from "next/link";

function AccountReviewList({ reviews, setReviewsUpdated }) {
  const [showDiscoverLink, setShowDiscoverLink] = useState(false);

  useEffect(() => {
    if (reviews.length === 0) {
      setShowDiscoverLink(true);
    }
  }),
    [];

  return (
    <div className="bg-white py-3 shadow-lg max-w-screen-lg mx-auto px-4 md:pb-6 md:pt-4 md:px-6">
      {showDiscoverLink ? (
        <div>
          <h3 className="font-semibold text-lg py-4 text-center md:text-xl">
            Write your first review!
          </h3>
          <p className="font-semibold text-gray-500 text-sm text-center pb-4 ">
            Discover a cafe you love and share your thoughts with the community{" "}
            <Link href="/discover" className="underline font-bold" role="link">
              here
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-lg text-gray-800 pb-4 pt-3 md:text-xl md:pb-6">
            My Reviews
          </h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {reviews.map((review, index) => (
              // <AccountReviewCard key={review._id} review={review} setReviewsUpdated={setReviewsUpdated} />
              <AccountReviewCard
                key={review._id || index} 
                cafeName={review.cafe?.name || "Cafe not found"}
                reviewDescription={review.description}
                reviewTimestamp={review.timestamp}
                reviewImage={review.image}
                reviewId={review._id}
                setReviewsUpdated={setReviewsUpdated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountReviewList;
