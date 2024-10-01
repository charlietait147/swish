import { useState } from "react";
function CafeFiltersModal({
  toggleModal,
  filters,
  handleInputChange,
  amenities,
  selectedAmenities,
  handleAmenityClick,
  handleResetFilters,
  handleApplyFilters,
  setLoading,
}) {
  const [slideOut, setSlideOut] = useState(false);

  const toggleClose = () => {
    setSlideOut(true); // Trigger slide-out animation
    setTimeout(() => {
      toggleModal();
    }, 500);

  };

  const handleApplyAndClose = async () => {
    setSlideOut(true); // Trigger slide-out animation

    // Wait for the slide-out animation to complete, then close the modal
    setTimeout(() => {
      toggleModal(); // Close modal after the animation finishes
    }, 500);

    // Wait a bit longer to ensure the modal transition has fully completed
    await new Promise((resolve) => setTimeout(resolve, 600)); // Match the CSS animation duration

    // Now start the loading state and apply filters
    setLoading(true);

    try {
      await handleApplyFilters(); // Fetch and apply filters (async)
    } finally {
      setLoading(false); // Ensure loading is set to false when done
    }
  };

  const handleTransitionEnd = () => {
    if (slideOut) {
      toggleModal(); // Once slide-out animation completes, close the modal
    }
  };

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" role="dialog">
      <div
        className={`bg-white w-full max-w-lg rounded-lg shadow-lg ${
          slideOut ? "slider-out" : "slider"
        }`} // Add condition for slide-out animation
        onTransitionEnd={handleTransitionEnd} // Listen for transition end
      >
        <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
          <div className="flex justify-between items-center px-6 pt-4 pb-4 border-b-2 border-b-gray-200 mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={toggleClose} role="button" aria-label="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-7 h-7 p-1 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Your Filter Form */}
          <div className="flex flex-col space-y-6 px-6 pb-6">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Amenities</label>
              <ul className="flex flex-wrap gap-2 mt-2">
              {(amenities || []).map((amenity, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleAmenityClick(amenity)}
                      className={`px-3 py-2 rounded-full border-2 text-xs ${
                        selectedAmenities.includes(amenity)
                          ? "border-orange-600 text-orange-600"
                          : "border-gray-300 text-gray-700"
                      } focus:outline-none`}
                    >
                      {amenity}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                role="button"
                aria-label="clear modal filters"
              >
                Clear
              </button>
              <button
                onClick={handleApplyAndClose}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                role="button"
                aria-label="apply modal filters"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeFiltersModal;
