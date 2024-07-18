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

export default function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("token");
    if (!user) {
      router.push("/");
    }
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetchUserData();
        console.log("Response from API:", response);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

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

  return (
    <>
      <Header />
      <AccountOverview
        email={userData.email}
        cafesLength={userData.cafes.length}
        reviewsLength={userData.reviews.length}
      />
      <Footer />
    </>
  );
}
