import Link from "next/link";
function CafeCard({ cafe }) {
  return (
    <Link href= {`cafe/${cafe._id}`}>
      <div
        className="relative bg-cover bg-center w-full shadow-lg overflow-hidden h-48 border-2 border-orange-400 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        style={{
          backgroundImage: `url(${process.env.NEXT_API_URL}/public/images/${cafe.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
        {/* Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-4">
          <h2 className="text-white text-lg uppercase font-semibold px-4 text-center">
            {cafe.name}
          </h2>
        </div>
        <div className="absolute left-0 bottom-0 bg-orange-500 text-white p-2 rounded-tr-lg flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p className="text-sm pl-0.5">{cafe.location}</p>
        </div>
      </div>
    </Link>
  );
}

export default CafeCard;
