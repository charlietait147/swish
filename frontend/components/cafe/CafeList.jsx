import CafeCard from "./CafeCard";

function CafeList({ cafes }) {
  return (
    <div className="flex flex-col gap-5 px-4 pb-4">
      {cafes.map((cafe) => (
        <CafeCard key={cafe._id} cafe={cafe} />
      ))}
    </div>
  );
}

export default CafeList;
