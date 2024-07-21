import AccountSavedCafeCard from "./AccountSavedCafeCard";

function AccountSavedCafeList({cafes, setCafesUpdated}) {
   
  return (
    <div className="bg-white md:bg-gray-200 md:px-8">
      <div className="bg-white py-3 shadow-lg px-4">
        <h3 className="font-semibold text-lg text-gray-800 pb-4 pt-3">
          My Saved Cafes
        </h3>
        <div className="flex flex-col gap-4">
            {cafes.map((cafe) => (
                <AccountSavedCafeCard key={cafe._id} cafe={cafe} setCafesUpdated={setCafesUpdated} />
            ))}   
        </div>
      </div>
    </div>
  );
}

export default AccountSavedCafeList;
