"use client";

import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import CafeFilters from "../../components/cafe/CafeFilters.jsx";
import CafeList from "../../components/cafe/CafeList.jsx";
import DiscoverCafeHero from "../../components/cafe/DiscoverCafeHero.jsx";
import { fetchCafes } from "../../services/cafe.service.jsx";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/logo/swish-logo.png"; // Image

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

    if (filters.location) {
      filteredCafes = filteredCafes.filter((cafe) =>
        cafe.location.toLowerCase().includes(filters.location.toLowerCase())
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
        {loading ? (
          <div className="flex justify-center items-center py-6 lg:pl-72 lg:py-24">
            <Image
              src={Logo}
              alt="Swish Logo Spinning"
              width={125}
              height={125}
              className="spinner"
              priority={true}
            />
          </div>
        ) : (
          <CafeList cafes={filteredCafes} />
        )}
      </div>
      <Footer />
    </>
  );
}
