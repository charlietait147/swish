import CafeCard from "./CafeCard";
import PropTypes from "prop-types";

function CafeList({ cafes }) {

  const sortedCafes = cafes.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      {sortedCafes.length == 0 ? (
        <div className="px-4 py-8 md:px-24 md:py-16 md:gap-5 lg:px-4 flex flex-col gap-3 flex-grow justify-center  ">
          <h1 className="text-2xl font-semibold text-center text-gray-700 tracking-wide md:text-4xl">
            Sorry!
          </h1>
          <p className="text-sm text-center md:text-base text-gray-400">
            We couldn't find any cafes that matched your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 px-4 pb-8 xs:grid-cols-2 md:px-24 lg:px-4 flex-grow pt-4 bg-white">
          {sortedCafes.map((cafe) => (
            <CafeCard key={cafe._id} cafeId={cafe._id} image={cafe.image} name={cafe.name} location={cafe.location} />
          ))}
        </div>
      )}
    </>
  );
}

CafeList.propTypes = {
  cafes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CafeList;


