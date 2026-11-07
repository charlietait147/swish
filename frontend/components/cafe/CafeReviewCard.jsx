import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import PropTypes from "prop-types";
import StarRating from "./StarRating";
import { getAvatarSrc } from "../../utils/avatar";

function CafeReviewCard({ timestamp, description, name, image, rating, avatar }) {

  return (
    <div className="h-full">
      <div className="bg-white py-4 px-4 flex flex-col rounded-lg h-full">
        <div className="flex flex-row justify-between items-center pb-1.5">
          <div className="flex flex-row items-center gap-2">
            <div className="size-10 shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-300">
              <Image
                src={getAvatarSrc(avatar)}
                width={40}
                height={40}
                alt={`${name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-800 text-base font-bold">{name}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 pb-1.5">
          {rating && <StarRating rating={rating} />}
          <p className="text-gray-400 text-xs">
            {formatDistanceToNowStrict(timestamp)} ago
          </p>
        </div>
        {/* <p className="text-gray-500 text-sm">{date}</p>   */}
        <p className="text-gray-800 text-sm font-light pr-4">{description}</p>
        <div
          className={`flex ${
            image ? "flex-row justify-between" : "flex-col"
          } gap-5`}
        >
          {image && (
            <div className="flex items-center">
              <Image
                src={`${process.env.NEXT_API_URL}/uploads/${image}`}
                height={150}
                width={150}
                alt="review photo"
                className="mt-3 border-2 border-gray-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CafeReviewCard.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  rating: PropTypes.number,
  avatar: PropTypes.string,
};



export default CafeReviewCard;
