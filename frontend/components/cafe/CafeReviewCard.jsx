import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Image from "next/image";

function CafeReviewCard({ review }) {
  return (
    <div>
      <div className="bg-white border border-gray-300 py-4 px-4 flex flex-col rounded-lg shadow-md">
        <div className="flex flex-row justify-between items-center pb-1.5">
          <div className="flex flex-row ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-800 text-sm font-bold">{review.name}</p>
          </div>
          <p className="text-gray-400 text-xs">
            {formatDistanceToNowStrict(review.timestamp)} ago
          </p>
        </div>
        {/* <p className="text-gray-500 text-sm">{review.date}</p>   */}
        <p className="text-gray-800 text-xs font-light">{review.description}</p>
        {review.image ? (
        <div className="flex flex-row items-center">
          <Image
            src={`${process.env.NEXT_API_URL}/uploads/${review.image}`}
            width={150}
            height={150}
            alt="review photo"
            className=" mt-3 border-2 border-gray-300"
          />
        </div>
        ) : null}
      </div>
    </div>
  );
}

export default CafeReviewCard;
