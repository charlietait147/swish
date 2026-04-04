"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { resetPassword as resetPasswordService } from "../../../services/auth.service.jsx";
import ResetPasswordForm from "@/components/authentication/ResetPasswordForm.jsx";

import Image from "next/image";
import Logo from "../../../public/logo/swish-orange-logo.jpeg";

export default function PasswordReset() {
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { token } = useParams();

    const handleResetPassword = async (newPassword) => {
        console.log("token: ", token);
        console.log("new password", newPassword )
        if (!token) return;
    
        try {
          setLoading(true);
          setError("");
    
          await resetPasswordService(token, newPassword);
    
          setSuccess(true);

          setTimeout(() => {
            router.push("/"); // Redirect to the homepage after a delay
          }, 2000); // 2 seconds delay

        } catch (err) {
            setError(err?.response?.data?.error || "Something went wrong");
        } finally {
          setLoading(false);
          
        }
      };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                     <Image
                      src={Logo}
                      alt="Swish Logo"
                      priority={true}
                      className="mx-auto h-24 w-24"
                    />
                     <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Choose a new password
                    </h2>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Please choose a password that's different to your old one and we'll sign you in.
                    </p>
               </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <ResetPasswordForm
                onSubmit={handleResetPassword}
                loading={loading}
                error={error}
                success={success}
            />
        </div>
         </div>
    )
}

