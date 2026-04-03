"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { resetPassword as resetPasswordService } from "../../../services/auth.service.jsx";

import Image from "next/image";
import Logo from "../../../public/logo/swish-orange-logo.jpeg";

export default function PasswordReset() {
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { token } = useParams();

    const handleResetPassword = async (newPassword) => {
        if (!token) return;
    
        try {
          setLoading(true);
          setError("");
    
          await resetPasswordService(token, newPassword);
    
          setSuccess(true);
        } catch (err) {
          setError(err.message);
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
               </div>
             
         </div>
    )
}

