"use client";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import AccountOverview from "../../components/account/AccountOverview";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserData } from "../../services/user.service.jsx";
import AccountPageSkeleton from "../../components/account/AccountPageSkeleton";
import AccountReviewList from "../../components/account/AccountReviewList";
import AccountSavedCafeList from "../../components/account/AccountSavedCafeList";
import { notFound } from "next/navigation";

export default function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsUpdated, setReviewsUpdated] = useState(false);
  const [cafesUpdated, setCafesUpdated] = useState(false);
  const [error, setError] = useState(null);

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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [reviewsUpdated, cafesUpdated]);

  if (error) {
    notFound();
  }

  if (loading) {
    return (
      <>
        <Header />
        <AccountPageSkeleton />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {userData && (
        <div className="bg-gray-200 pb md:px-24 lg:px-6 md:pb-6 lg:pb-12">
          <AccountOverview
            email={userData.email}
            avatar={userData.avatar}
            onAvatarUpdated={(avatar) => setUserData({ ...userData, avatar })}
            cafesLength={userData.cafes.length}
            reviewsLength={userData.reviews.length}
          />
          <div className="bg-gray-200 py-2.5 md:py-4 lg:py-6"></div>
          <AccountSavedCafeList
            cafes={userData.cafes}
            setCafesUpdated={setCafesUpdated}
          />
          <div className="bg-gray-200 py-2.5 md:py-4 lg:py-6"></div>
          <AccountReviewList
            reviews={userData.reviews}
            setReviewsUpdated={setReviewsUpdated}
          />
        </div>
      )}
      <Footer />
    </>
  );
}
