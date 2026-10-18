"use client";

import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import DiscoverFiltersBar from "../../components/cafe/DiscoverFiltersBar.jsx";
import CafeList from "../../components/cafe/CafeList.jsx";
import CafeListSkeleton from "@/components/cafe/CafeListSkeleton";
import { fetchCafes } from "../../services/cafe.service.jsx";
import { useState, useEffect } from "react";

export default function DiscoverPage() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const getCafes = async () => {
    const response = await fetchCafes();
    setCafes(response);
    setFilteredCafes(response);
    setLoading(false);
  };

  useEffect(() => {
    getCafes();
  }, []);

  const handleFilters = (filters) => {
    let filteredCafes = cafes;
    if (filters.name) {
      filteredCafes = filteredCafes.filter((cafe) =>
        cafe.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // if (filters.location) {
    //   filteredCafes = filteredCafes.filter((cafe) =>
    //     cafe.location.toLowerCase().includes(filters.location.toLowerCase())
    //   );
    // }

    if (filters.location) {
      filteredCafes = filteredCafes.filter((cafe) =>
        cafe.locations.some((loc) =>
          loc.toLowerCase().includes(filters.location.toLowerCase())
        )
      );
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filteredCafes = filteredCafes.filter((cafe) =>
        filters.amenities.every((amenity) =>
          cafe.icons.some((icon) => icon.type === amenity)
        )
      );
    }

    setFilteredCafes(filteredCafes);
  };

  // Every location a cafe is in, for the location dropdown
  const locations = [...new Set(cafes.flatMap((cafe) => cafe.locations))].sort();

  return (
    <>
      <Header />
      <DiscoverFiltersBar
        onFilterChange={handleFilters}
        setSelectedAmenities={setSelectedAmenities}
        selectedAmenities={selectedAmenities}
        setLoading={setLoading}
        locations={locations}
      />
      <div className="flex flex-col max-width mx-auto lg:mt-2 lg:mb-8">
        {loading ? (
          <CafeListSkeleton />
        ) : (
          <CafeList cafes={filteredCafes} />
        )}
      </div>
      <Footer />
    </>
  );
}
