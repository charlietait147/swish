"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CafeFilters from "@/components/cafe/CafeFilters";
import CafeList from "@/components/cafe/CafeList";
import DiscoverCafeHero from "@/components/cafe/DiscoverCafeHero";
import { fetchCafes } from "@/services/cafe.service";
import { useState, useEffect } from "react";

export default function DiscoverPage() {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const getCafes = async () => {
    const response = await fetchCafes();
    setCafes(response);
    setFilteredCafes(response);
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

    if (filters.location) {
      filteredCafes = filteredCafes.filter((cafe) =>
        cafe.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    // if (selectedAmenities.length > 0) {
    //   filteredCafes = filteredCafes.filter((cafe) =>
    //     selectedAmenities.every((amenity) =>
    //       cafe.icons.some((icon) => icon.type === amenity)
    //     )
    //   );
    // }
    if (filters.amenities && filters.amenities.length > 0) {
      filteredCafes = filteredCafes.filter((cafe) =>
        filters.amenities.every((amenity) =>
          cafe.icons.some((icon) => icon.type === amenity)
        )
      );
    }

    setFilteredCafes(filteredCafes);
  };

  return (
    <>
      <Header />
      <DiscoverCafeHero />
      <div className="flex flex-col lg:flex-row max-width mx-auto lg:my-12">
      <div className="lg:sticky lg:top-0 lg:h-full lg:pt-4">
        <CafeFilters
          onFilterChange={handleFilters}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={selectedAmenities}
        />
        </div>
        <CafeList cafes={filteredCafes} />
      </div>
      <Footer />
    </>
  );
}
