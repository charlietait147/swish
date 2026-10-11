function AccountPageSkeleton() {
  return (
    <div
      className="bg-gray-200 md:px-24 lg:px-6 md:pb-6 lg:pb-12"
      role="status"
      aria-label="Loading account"
      data-testid="account-page-skeleton"
    >
      <div className="animate-pulse">
        {/* Overview */}
        <div className="pt-16 pb-3 flex justify-center">
          <div className="h-8 w-48 rounded-md bg-gray-300 md:h-9"></div>
        </div>
        <div className="bg-white py-3 shadow-lg max-w-screen-lg mx-auto md:pb-6 md:pt-4">
          <div className="flex flex-row items-center px-4">
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="ml-2 flex flex-col gap-2">
              <div className="h-4 w-44 rounded-md bg-gray-200"></div>
              <div className="h-3 w-24 rounded-md bg-gray-200"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-9 w-28 rounded-md bg-gray-200"></div>
          </div>
          <div className="border border-1 border-gray-200 mt-4"></div>
          <div className="flex flex-row justify-around p-4">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="h-4 w-24 rounded-md bg-gray-200"></div>
                <div className="h-6 w-8 rounded-md bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-2.5 md:py-4 lg:py-6"></div>
        {/* Saved cafes */}
        <div className="bg-white py-3 shadow-lg px-4 max-w-screen-lg mx-auto md:pb-6 md:pt-4 md:px-6">
          <div className="h-7 w-40 rounded-md bg-gray-300 mt-3 mb-4 md:mb-6"></div>
          <div className="flex flex-col gap-4 xs:grid grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden h-48 rounded-lg bg-gray-200 lg:h-52"
              >
                <div className="absolute left-0 bottom-0 bg-gray-400 h-9 w-28 rounded-tr-lg"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-2.5 md:py-4 lg:py-6"></div>
        {/* Reviews */}
        <div className="bg-white py-3 shadow-lg max-w-screen-lg mx-auto px-4 md:pb-6 md:pt-4 md:px-6">
          <div className="h-7 w-40 rounded-md bg-gray-300 mt-3 mb-4 md:mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-32 rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPageSkeleton;
