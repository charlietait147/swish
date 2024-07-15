"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchCafe } from "@/services/cafe.service";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CafeDetailsSection from "@/components/cafe/CafeDetailsSection";
import Logo from '../../../public/logo/swish-logo.png';
import Image from 'next/image';
import CafeReviewList from "@/components/cafe/CafeReviewList";

export default function CafePage() {
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsUpdated, setReviewsUpdated] = useState(false);
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
  }, [reviewsUpdated]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <Image src={Logo} alt="Swish Logo" width = {125} height = {125} className="spinner" priority={true}/>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <CafeDetailsSection cafe={cafe} />
      <CafeReviewList cafe = {cafe} setReviewsUpdated = {setReviewsUpdated} />
      <Footer />
    </>
  );
}
