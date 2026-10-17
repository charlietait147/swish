function CafePageSkeleton() {
  return (
    <div
      className="animate-pulse"
      role="status"
      aria-label="Loading cafe"
      data-testid="cafe-page-skeleton"
    >
      {/* Details */}
      <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 xl:px-0 mt-8 lg:mt-12 mb-6 px-4">
        <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-14">
          <div className="w-full lg:w-1/2 flex-shrink-0 aspect-[3/2] rounded-lg bg-gray-200"></div>
          <div className="lg:w-1/2 flex flex-col gap-4 md:gap-5">
            <div className="flex flex-row justify-between md:flex-col gap-2">
              <div className="h-9 w-48 rounded-md bg-gray-300 md:h-10 md:w-64"></div>
              <div className="h-5 w-24 rounded-md bg-gray-400"></div>
            </div>
            <div className="h-10 w-full rounded-lg bg-gray-200 md:w-64"></div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <div className="w-12 h-12 rounded-md bg-gray-200"></div>
                  <div className="h-4 w-32 rounded-md bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 h-28 w-full rounded-md bg-gray-200"></div>
      </div>
      {/* Map */}
      <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 lg:pt-6 xl:px-0 px-4 flex flex-col gap-3 pb-6">
        <div className="h-7 w-28 rounded-md bg-gray-300"></div>
        <div className="h-5 w-56 rounded-md bg-gray-200"></div>
        <div className="w-full h-80 sm:h-96 md:h-120 lg:h-132 bg-gray-200"></div>
      </div>
      {/* Reviews */}
      <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 lg:pt-6 xl:px-0 px-4 pb-4">
        <div className="h-7 w-28 rounded-md bg-gray-300 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-32 rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CafePageSkeleton;
