import { useEffect, useRef, useState } from "react";
import CafeFiltersModal from "./CafeFiltersModal";
function CafeFilters({
  onFilterChange,
  setSelectedAmenities,
  selectedAmenities,
  setLoading,
  collapsed = false,
  pinned = false,
  onExpand,
  locations = [],
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // "location", "amenities" or null
  const [mobileSearch, setMobileSearch] = useState(""); // New state for mobile search
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchBarRef = useRef(null);

  const toggleDropdown = (dropdown) =>
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));

  // Close any open dropdown when clicking outside of the search bar
  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e) => {
      if (!searchBarRef.current?.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const amenities = [
    "Accessible by Public Transport",
    "Dog Friendly",
    "Hot Food Available",
    "Onsite Parking",
    "Takes Bookings",
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
    const appliedFilters = {
      // Apply filters including amenities
      ...filters,
      amenities: selectedAmenities,
    };
    onFilterChange(appliedFilters); // Call the onFilterChange prop with the applied filters
    setOpenDropdown(null);
  };

  // Locations matching what has been typed so far, shown as suggestions under the location field
  const locationSuggestions = locations.filter((location) =>
    location.toLowerCase().includes(filters.location.toLowerCase())
  );

  const handleSelectLocation = (location) => {
    setFilters({ ...filters, location });
    setOpenDropdown(null);
  };

  // Removes a single filter from the desktop search bar and refreshes the results straight away
  const handleClearField = (field) => {
    const updatedFilters = { ...filters, amenities: selectedAmenities };
    if (field === "amenities") {
      updatedFilters.amenities = [];
      setSelectedAmenities([]);
    } else {
      updatedFilters[field] = "";
      setFilters({ ...filters, [field]: "" });
    }
    onFilterChange(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      // Reset all filters including amenities
      name: "",
      location: "",
      amenities: [],
    };

    setFilters(resetFilters); // Reset the filters state
    setSelectedAmenities([]); // Reset the selected amenities state

    onFilterChange(resetFilters); // Call the onFilterChange prop with an empty object
  };

  const handleMobileSearch = () => {
    // Trigger search by name only when the search icon is clicked on mobile
    const searchFilters = {
      ...filters,
      name: mobileSearch, // Use the mobile search state
    };
    onFilterChange(searchFilters);
  };

  return (
    <div>
      {/* Search and Filters Button for Mobile */}
      <div className="lg:hidden">
      <div className="w-full flex flex-row gap-3">
        <div className="flex flex-row items-center w-full max-w-full p-2 bg-white rounded-full shadow-md border border-gray-300 cursor-pointer hover:shadow-lg">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 ml-1 cursor-pointer"
            onClick={handleMobileSearch}
            role="button"
            aria-label="search"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 17a6 6 0 100-12 6 6 0 000 12zM21 21l-4.35-4.35"
            />
          </svg>

          {/* Search Input */}
          <input
            type="text"
            className="ml-2 w-full bg-transparent focus:outline-none text-base text-gray-700 placeholder-gray-500 placeholder:text-sm"
            placeholder="Search by name"
            value={mobileSearch}
            onChange={(e) => setMobileSearch(e.target.value)}
          />
        </div>
        <button
          onClick={toggleModal}
          className="border border-gray-300 bg-white text-black text-sm gap-1.5 items-center flex flex-row font-semibold py-3 px-4 rounded-full"
          role="button"
          aria-label="filters modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 ml-auto cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <span className="hidden xs:block">Filters</span>
        </button>
      </div>
      </div>

      {isModalOpen && (
        <CafeFiltersModal
          toggleModal={toggleModal}
          filters={filters}
          handleInputChange={handleInputChange}
          amenities={amenities}
          selectedAmenities={selectedAmenities}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          handleAmenityClick={handleAmenityClick}
          setLoading={setLoading}
        />
      )}

      {/* Shorter bar shown on desktop once the user scrolls past the full panel */}
      {collapsed && (
        <button
          onClick={onExpand}
          className="hidden lg:flex w-full flex-row items-center gap-4 bg-white border border-gray-200 rounded-full shadow-md pl-6 pr-2 py-2 text-left hover:shadow-xl"
          aria-label="expand filters"
        >
          <span className="text-lg font-semibold text-gray-800">Find your fix...</span>
          <span className="h-6 w-px bg-gray-300"></span>
          <span className="text-sm text-gray-500 truncate">
            {filters.name || "Any cafe"} · {filters.location || "Anywhere"} ·{" "}
            {selectedAmenities.length
              ? `${selectedAmenities.length} ${selectedAmenities.length === 1 ? "amenity" : "amenities"}`
              : "Any amenities"}
          </span>
          <span className="ml-auto flex flex-row items-center gap-1.5 bg-orange-500 text-white text-sm font-semibold rounded-full py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17a6 6 0 100-12 6 6 0 000 12zM21 21l-4.35-4.35"
              />
            </svg>
            Filters
          </span>
        </button>
      )}

      <div className={collapsed ? "hidden" : "hidden lg:block"}>
      {/* The heading sits on the orange band, so it's left out once the bar is pinned over the page */}
      {!pinned && (
        <h1 className="text-2xl font-semibold text-white tracking-wide text-center mb-3">Find your fix...</h1>
      )}
        <div
          ref={searchBarRef}
          className="flex flex-row items-stretch bg-white border border-gray-100 rounded-2xl shadow-xl"
        >
          {/* Name */}
          <div className="relative flex-1 min-w-0 rounded-l-2xl hover:bg-gray-50 focus-within:bg-gray-50">
            <label
              className="block px-6 pt-3.5 text-sm font-semibold text-gray-800 cursor-text"
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
              onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
              placeholder="Search by cafe name"
              className="block w-full px-6 pr-10 pb-3.5 bg-transparent text-base text-gray-700 placeholder-gray-400 placeholder:text-sm focus:outline-none"
            />
            {filters.name && (
              <ClearFieldButton label="Clear name" onClick={() => handleClearField("name")} />
            )}
          </div>

          <span className="w-px my-2 bg-gray-200" aria-hidden="true"></span>

          {/* Location - free text, with suggestions from the cafes' locations */}
          <div className="relative flex-1 min-w-0 hover:bg-gray-50 focus-within:bg-gray-50">
            <label
              className="block px-6 pt-3.5 text-sm font-semibold text-gray-800 cursor-text"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={filters.location}
              onChange={(e) => {
                handleInputChange(e);
                setOpenDropdown("location");
              }}
              onFocus={() => setOpenDropdown("location")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyFilters();
                if (e.key === "Escape") setOpenDropdown(null);
              }}
              placeholder="Search by town or area"
              autoComplete="off"
              role="combobox"
              aria-expanded={openDropdown === "location" && locationSuggestions.length > 0}
              aria-controls="location-list"
              className="block w-full px-6 pr-10 pb-3.5 bg-transparent text-base text-gray-700 placeholder-gray-400 placeholder:text-sm focus:outline-none"
            />
            {filters.location && (
              <ClearFieldButton label="Clear location" onClick={() => handleClearField("location")} />
            )}
            {openDropdown === "location" && locationSuggestions.length > 0 && (
              <ul
                id="location-list"
                role="list"
                aria-label="location-list"
                className="absolute top-full left-0 right-0 mt-2 z-30 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg py-1"
              >
                {locationSuggestions.map((location) => (
                  <li key={location}>
                    <button
                      type="button"
                      onClick={() => handleSelectLocation(location)}
                      className={`w-full px-4 py-1.5 text-sm text-left hover:bg-gray-50 ${
                        filters.location === location
                          ? "font-semibold text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      {location}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <span className="w-px my-2 bg-gray-200" aria-hidden="true"></span>

          {/* Amenities */}
          <div className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={() => toggleDropdown("amenities")}
              className={`w-full h-full flex flex-row items-center gap-2 px-6 pr-10 py-3.5 text-left hover:bg-gray-50 ${
                openDropdown === "amenities" ? "bg-gray-50" : ""
              }`}
              aria-label="amenities-dropdown"
              aria-expanded={openDropdown === "amenities"}
            >
              <span className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-gray-800">Amenities</span>
                <span className={`truncate ${selectedAmenities.length ? "text-base text-gray-700" : "text-sm leading-6 text-gray-400"}`}>
                  {selectedAmenities.length
                    ? `${selectedAmenities.length} selected`
                    : "Any amenities"}
                </span>
              </span>
                <svg
                  className={`w-4 h-4 shrink-0 text-gray-500 transform transition-transform ${
                    openDropdown === "amenities" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
            </button>
            {selectedAmenities.length > 0 && (
              <ClearFieldButton label="Clear amenities" onClick={() => handleClearField("amenities")} />
            )}
            {openDropdown === "amenities" && (
              <ul
                role="list"
                aria-label="amenities-list"
                className="absolute top-full left-0 right-0 mt-2 z-30 min-w-max bg-white border border-gray-200 rounded-xl shadow-lg py-1"
              >
                {amenities.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <li key={amenity}>
                      <button
                        type="button"
                        onClick={() => handleAmenityClick(amenity)}
                        aria-pressed={isSelected}
                        className="flex flex-row items-center gap-2 w-full px-4 py-1.5 text-sm text-left text-gray-700 hover:bg-gray-50"
                      >
                        <span
                          className={`flex items-center justify-center w-4 h-4 rounded border ${
                            isSelected
                              ? "bg-orange-500 border-orange-500"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        {amenity}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={handleApplyFilters}
            className="flex flex-row items-center m-2.5 bg-orange-500 text-white text-base font-semibold rounded-xl px-8 hover:bg-orange-400"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

// Small cross shown inside a search bar field once it has a value
function ClearFieldButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export default CafeFilters;
