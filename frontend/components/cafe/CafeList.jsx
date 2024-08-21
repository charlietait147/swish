import CafeCard from "./CafeCard";

function CafeList({ cafes }) {
    const sortedCafes = cafes.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="grid grid-cols-1 gap-5 px-4 pb-4 xs:grid-cols-2 md:px-24 lg:px-4 flex-grow">
      {sortedCafes.map((cafe) => (
        <CafeCard key={cafe._id} cafe={cafe} />
      ))}
    </div>
  );
}

export default CafeList;
