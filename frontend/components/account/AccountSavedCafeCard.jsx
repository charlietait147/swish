import Link from "next/link";
import { deleteSavedCafe } from "@/services/user.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
function AccountSavedCafeCard({ cafe, setCafesUpdated }) {
  const [deleteClicked, setDeleteClicked] = useState(false);

  const router = useRouter();

  const handleDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("Delete button clicked");

    try {
      await deleteSavedCafe(cafe._id);
      setCafesUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error deleting saved cafe", error);
    }
  };

  const handleCardClick = (event) => {
    if (!deleteClicked) {
      console.log("Navigating to cafe page");
      router.push(`/cafe/${cafe._id}`);
    } else {
      console.log("Navigation prevented due to delete action");
      setDeleteClicked(false);
    }
  };

  const handleDeleteClick = (event) => {
    console.log("Delete icon clicked, setting deleteClicked to true");
    handleDelete(event);
    setDeleteClicked(true);
  };

  return (
    <div onClick={handleCardClick}>
      {/* <Link href={`/cafe/${cafe._id}`}> */}
      {/* <div> */}
      <div
        className="relative bg-cover bg-center w-full shadow-lg overflow-hidden h-48 border-2 border-orange-400 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 md:h-48 lg:h-52"
        style={{
          backgroundImage: `url(${process.env.NEXT_API_URL}/public/images/${cafe.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
        {/* Overlay */}
        <div className="relative flex flex-col justify-center items-center h-full p-4">
          <h2 className="text-white text-lg uppercase font-semibold px-4 text-center">
            {cafe.name}
          </h2>
        </div>
        <div onClick={handleDeleteClick} className="absolute z-10 top-0 right-0">
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-white mr-2 mt-2"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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
      {/* </div> */}

      {/* </Link> */}
    </div>
  );
}

export default AccountSavedCafeCard;
