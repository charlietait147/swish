import PropTypes from "prop-types";

function CafeListSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 gap-8 px-4 pb-8 xs:grid-cols-2 lg:grid-cols-3 md:px-24 lg:px-4 flex-grow pt-4 bg-white"
      role="status"
      aria-label="Loading cafes"
      data-testid="cafe-list-skeleton"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="relative w-full shadow-lg overflow-hidden h-56 rounded-lg bg-gray-200 animate-pulse"
          data-testid="cafe-card-skeleton"
        >
          <div className="absolute left-0 bottom-0 bg-gray-400 h-9 w-28 rounded-tr-lg"></div>
        </div>
      ))}
    </div>
  );
}

CafeListSkeleton.propTypes = {
  count: PropTypes.number,
};

export default CafeListSkeleton;
