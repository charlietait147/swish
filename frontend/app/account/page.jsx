"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AccountOverview from "@/components/account/AccountOverview";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get("token");
        if (!user) {
            router.push("/");
        }
    });


  return (
    <>
      <Header />
      <AccountOverview />
      <Footer />
    </>
  );

}