import { useState } from "react";
function CafeFilters({ onFilterChange, setSelectedAmenities, selectedAmenities }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const amenities = [
    "Accessible by Public Transport",
    "Dog Friendly",
    "Hot Food Available",
    "Onsite Parking",
    "Takes Bookings"
  ];

  const handleAmenityClick = (amenity) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenity)
        ? prevSelected.filter((item) => item !== amenity)
        : [...prevSelected, amenity]
    );
  };

  const [filters, setFilters] = useState({
    name: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the event target
    const updatedFilters = { ...filters, [name]: value }; // Update the filters state

    setFilters(updatedFilters); // Update the filters state
  };

  const handleApplyFilters = () => {
    // onFilterChange(filters);
    const appliedFilters = { // Apply filters including amenities
      ...filters, 
      amenities: selectedAmenities, 
    };
    onFilterChange(appliedFilters); // Call the onFilterChange prop with the applied filters
  };

  const handleResetFilters = () => {
    // setFilters({
    //   // Reset the filters state
    //   name: "",
    //   location: "",
    // });
    // setSelectedAmenities([]); // Reset the selected amenities state
    
    // onFilterChange({
    //   // Call the onFilterChange prop with an empty object
    //   name: "",
    //   location: "",
    // });
    const resetFilters = { // Reset all filters including amenities
      name: "",
      location: "",
      amenities: [],
    };
  
    setFilters(resetFilters); // Reset the filters state
    setSelectedAmenities([]); // Reset the selected amenities state
  
    onFilterChange(resetFilters); // Call the onFilterChange prop with an empty object
  };

  return (
    <div className="bg-white py-6 px-6 ">
      <div className="bg-gray-200 rounded-lg shadow-lg flex flex-col py-3 px-4">
        <div className="flex flex-row">
          <h1 className="text-xl font-semibold">Filters</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 ml-auto cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
        <h3 className="text-sm font-semibold pt-1 text-gray-500">
          Use filters to further refine your search
        </h3>
        <div className="flex flex-col mt-3">
          <label
            className="text-sm font-semibold leading-6 text-gray-900"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={filters.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2.5 py-1.5 mt-1 text-sm"
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="text-sm font-semibold" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={filters.location}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-2.5 py-1.5 mt-1 text-sm"
          />
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex flex-row items-center gap-2">
            <label className="text-sm font-semibold">
              Amenities
            </label>
            <div
              onClick={toggleDropdown}
              className="cursor-pointer"
            >
              <svg
                className={`w-4 h-4 transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {isOpen && (
            <div className="w-full">
              <ul className="overflow-y-auto pt-2 flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center mb-1">
                    <button
                      onClick={() => handleAmenityClick(amenity)}
                      id="amenities"
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
          )}
        </div>

        <div className="flex flex-row">
          <button
            className="bg-orange-500 w-32 text-white font-semibold rounded-lg mt-4 py-2 hover:bg-orange-400 text-sm"
            onClick={handleApplyFilters}
          >
            {" "}
            Apply Filters
          </button>
          <button
            className="bg-gray-300 w-32 text-gray-700 font-semibold rounded-lg mt-4 py-2 hover:bg-gray-400 ml-4 text-sm"
            onClick={handleResetFilters}
          >
            {" "}
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default CafeFilters;
