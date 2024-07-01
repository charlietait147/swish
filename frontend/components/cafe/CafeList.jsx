import CafeCard from "./CafeCard";

function CafeList({ cafes }) {
    const sortedCafes = cafes.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="flex flex-col gap-5 px-4 pb-4">
      {sortedCafes.map((cafe) => (
        <CafeCard key={cafe._id} cafe={cafe} />
      ))}
    </div>
  );
}

export default CafeList;
