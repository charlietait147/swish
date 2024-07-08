function CafeReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-300 py-4 px-4 flex flex-col rounded-lg shadow-md">
      <div className="flex flex-row justify-between">
        <p className="text-gray-800 text-sm font-bold pb-1.5">{review.name}</p>
        <p className="text-gray-500 text-sm">{review.timestamp}</p>
      </div>
      {/* <p className="text-gray-500 text-sm">{review.date}</p>   */}
      <p className="text-gray-800 text-xs font-light">{review.description}</p>
    </div>
  );
}

export default CafeReviewCard;
