import AccountSavedCafeCard from "./AccountSavedCafeCard";
import { useEffect, useState } from "react";
import Link from "next/link";

function AccountSavedCafeList({ cafes, setCafesUpdated }) {
  const [showDiscoverLink, setShowDiscoverLink] = useState(false);

  useEffect(() => {
    setShowDiscoverLink(cafes.length === 0);
  }, [cafes]);

  return (
    <div className="bg-white py-3 shadow-lg px-4 max-w-screen-lg mx-auto md:pb-6 md:pt-4 md:px-6">
      {showDiscoverLink ? (
        <div>
          <h3 className="font-semibold text-lg py-4 text-center md:text-xl">
            No cafes saved yet!
          </h3>
          <p className="font-semibold text-gray-500 text-sm text-center pb-4">
          Explore cafes and save your favorites for easy access anytime
            {" "}
            <Link href="/discover" role="link" className="underline font-bold">
              here
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-lg text-gray-800 pb-4 pt-3 md:text-xl md:pb-6">
            My Saved Cafes
          </h3>
          <div className="flex flex-col gap-4 xs:grid grid-cols-2 lg:grid-cols-3">
            {cafes.map((cafe, index) => (
              <AccountSavedCafeCard
                key={cafe._id || index}
                cafeId={cafe._id || ""}
                cafeName={cafe.name}
                cafeImage={cafe.image || ""}
                cafeLocation={cafe.location || ""}
                setCafesUpdated={setCafesUpdated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSavedCafeList;
