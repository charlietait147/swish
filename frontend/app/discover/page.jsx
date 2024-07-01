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
    setFilteredCafes(filteredCafes);
  };

  return (
    <>
      <Header />
      <DiscoverCafeHero />
      <CafeFilters onFilterChange={handleFilters} />
      <CafeList cafes={filteredCafes} />
      <Footer />
    </>
  );
}
