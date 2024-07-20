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
    <div className="bg-white md:bg-gray-200 md:px-8">
      <div className="bg-white py-3 shadow-lg px-4">
        {showDiscoverLink ? (
          <div>
            <h3 className="font-semibold text-lg py-4 text-center">
              Write your first review!
            </h3>
            <p className="font-semibold text-gray-500 text-sm text-center pb-4">
              Discover a cafe you love and share your thoughts with the
              community{" "}
              <Link href="/discover" className="underline font-bold">
                here
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-lg text-gray-800 pb-4 pt-3">
              My Reviews
            </h3>
            <div className="flex flex-col gap-4 pb-4">
              {reviews.map((review) => (
                <AccountReviewCard key={review._id} review={review} setReviewsUpdated={setReviewsUpdated} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountReviewList;
