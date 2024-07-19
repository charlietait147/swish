import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

function AccountReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-300 py-4 px-4 flex flex-col rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center pb-1.5">
        <div className="flex flex-row ">
          <p className="text-gray-800 text-sm font-semibold">
            @ {review.cafe.name}
          </p>
        </div>
        <p className="text-gray-400 text-xs">
          {formatDistanceToNowStrict(review.timestamp)} ago
        </p>
      </div>
      {/* <p className="text-gray-500 text-sm">{review.cafe.name}</p>   */}
      <p className="text-gray-800 text-xs font-light">{review.description}</p>
    </div>
  );
}

export default AccountReviewCard;
