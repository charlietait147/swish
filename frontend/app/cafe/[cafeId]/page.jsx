"use client";

import Footer from "../../../components/Footer.jsx";
import Header from "../../../components/Header.jsx";
import { fetchCafe } from "../../../services/cafe.service.jsx";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CafeDetailsSection from "../../../components/cafe/CafeDetailsSection.jsx";
import Logo from "../../../public/logo/swish-logo.png";
import Image from "next/image";
import CafeReviewList from "../../../components/cafe/CafeReviewList.jsx";
import CafeMapContainer from "../../../components/cafe/CafeMapContainer.jsx";
import { notFound } from "next/navigation";

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

  if (error) {
    notFound(); // This will send the user to the 404 page
  }

  return (
    <>
      {loading ? (
        <>
          <Header />
          <div className="flex justify-center items-center h-screen">
            <Image
              src={Logo}
              alt="Swish Logo Spinning"
              width={125}
              height={125}
              className="spinner"
              priority={true}
            />
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <CafeDetailsSection cafe={cafe} />
          <CafeMapContainer cafe={cafe} />
          <CafeReviewList cafe={cafe} setReviewsUpdated={setReviewsUpdated} />
          <Footer />
        </>
      )}
    </>
  );
}
