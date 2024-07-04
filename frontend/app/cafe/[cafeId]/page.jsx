"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchCafe } from "@/services/cafe.service";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CafePage() {
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cafeId } = useParams();

  const getCafe = async () => {
    if (cafeId) {
      try {
        const response = await fetchCafe(cafeId);
        setCafe(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCafe();
  }, []);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
