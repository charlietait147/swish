import CafeCard from "./CafeCard";

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
        <div className="grid grid-cols-1 gap-5 px-4 pb-4 xs:grid-cols-2 md:px-24 lg:px-4 flex-grow">
          {sortedCafes.map((cafe) => (
            <CafeCard key={cafe._id} cafe={cafe} />
          ))}
        </div>
      )}
    </>
  );
}

export default CafeList;
