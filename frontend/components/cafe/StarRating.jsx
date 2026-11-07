import { useState } from "react";
import PropTypes from "prop-types";

const STARS = [1, 2, 3, 4, 5];

const StarIcon = ({ filled, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={`${className} ${filled ? "text-orange-500" : "text-gray-300"}`}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

StarIcon.propTypes = {
  filled: PropTypes.bool,
  className: PropTypes.string,
};

// Read-only when no onChange is given, otherwise a clickable 1-5 picker
function StarRating({ rating = 0, onChange, size = "size-4" }) {
  const [hovered, setHovered] = useState(0);

  if (!onChange) {
    return (
      <div className="flex flex-row" role="img" aria-label={`${rating} out of 5 stars`}>
        {STARS.map((star) => (
          <StarIcon key={star} filled={star <= rating} className={size} />
        ))}
      </div>
    );
  }

  const shown = hovered || rating;

  return (
    <div className="flex flex-row gap-0.5" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHovered(0)}>
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === rating}
          aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
        >
          <StarIcon filled={star <= shown} className={size} />
        </button>
      ))}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.string,
};

export default StarRating;
