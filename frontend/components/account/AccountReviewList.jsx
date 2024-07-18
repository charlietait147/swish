import AccountReviewCard from "./AccountReviewCard";

function AccountReviewList({ reviews }) {
  return (
    <div className="bg-white py-3 shadow-lg">
      <h3 className="font-semibold text-lg text-gray-800 px-4">My Reviews</h3>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <AccountReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default AccountReviewList;
