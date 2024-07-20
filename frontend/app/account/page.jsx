"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AccountOverview from "@/components/account/AccountOverview";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/services/user.service.jsx";
import Image from "next/image";
import Logo from "../../public/logo/swish-logo.png";
import AccountReviewList from "@/components/account/AccountReviewList";
import AccountSavedCafeList from "@/components/account/AccountSavedCafeList";

export default function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsUpdated, setReviewsUpdated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("token");
    if (!user) {
      router.push("/");
    }
  }, [router]);

  const getUserData = async () => {
    try {
      const response = await fetchUserData();
      setUserData(response);
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [reviewsUpdated]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <Image
            src={Logo}
            alt="Swish Logo"
            width={125}
            height={125}
            className="spinner"
            priority={true}
          />
        </div>
        <Footer />
      </>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <Header />
      <AccountOverview
        email={userData.email}
        cafesLength={userData.cafes.length}
        reviewsLength={userData.reviews.length}
      />
      <div className="bg-gray-200 py-2.5"></div>
      <AccountSavedCafeList cafes={userData.cafes} />
      <div className="bg-gray-200 py-2.5"></div>
      <AccountReviewList
        reviews={userData.reviews}
        setReviewsUpdated={setReviewsUpdated}
      />
      <Footer />
    </>
  );
}
