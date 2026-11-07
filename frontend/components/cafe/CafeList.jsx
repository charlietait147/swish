import CafeCard from "./CafeCard";
import PropTypes from "prop-types";

const cafeGridClasses =
  "grid grid-cols-1 gap-8 px-4 pb-8 xs:grid-cols-2 lg:grid-cols-3 md:px-24 lg:px-4 flex-grow pt-4 bg-white";

function CafeGrid({ cafes }) {
  return (
    <div className={cafeGridClasses}>
      {cafes.map((cafe) => (
        <CafeCard key={cafe._id} cafeId={cafe._id} image={cafe.image} name={cafe.name} location={cafe.locations[0]} />
      ))}
    </div>
  );
}

function CafeList({ cafes, suggestions }) {

  const sortedCafes = cafes.sort((a, b) => a.name.localeCompare(b.name));

  if (sortedCafes.length > 0) {
    return <CafeGrid cafes={sortedCafes} />;
  }

  // Nothing matched every filter, so suggest close matches or recommended cafes instead
  if (suggestions?.cafes.length > 0) {
    return (
      <>
        <div className="px-4 pt-6 md:px-24 lg:px-4">
          <div
            role="status"
            className="flex items-center gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <p className="text-sm md:text-base text-gray-600">{suggestions.message}</p>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <span className="h-1 w-10 rounded-full bg-orange-500" aria-hidden="true"></span>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-wide">
              {suggestions.heading}
            </h2>
          </div>
        </div>
        {/* Suggestions are already ordered best first */}
        <CafeGrid cafes={suggestions.cafes} />
      </>
    );
  }

  return (
    <div className="px-4 py-8 md:px-24 md:py-16 md:gap-5 lg:px-4 flex flex-col gap-3 flex-grow justify-center  ">
      <h1 className="text-2xl font-semibold text-center text-gray-700 tracking-wide md:text-4xl">
        Sorry!
      </h1>
      <p className="text-sm text-center md:text-base text-gray-400">
        We couldn't find any cafes that matched your search.
      </p>
    </div>
  );
}

const cafeShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
});

CafeGrid.propTypes = {
  cafes: PropTypes.arrayOf(cafeShape).isRequired,
};

CafeList.propTypes = {
  cafes: PropTypes.arrayOf(cafeShape).isRequired,
  suggestions: PropTypes.shape({
    message: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    cafes: PropTypes.arrayOf(cafeShape).isRequired,
  }),
}

export default CafeList;
