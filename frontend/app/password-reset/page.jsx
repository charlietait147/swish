import Image from "next/image";
import Logo from "../../public/logo/swish-logo.png";
import PasswordResetForm from "@/components/authentication/PasswordResetForm.jsx"


export default function PasswordReset() {
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
          Reset your password
        </h2>
       </div>
       <p className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm text-sm/6 text-gray-700 ">Enter your email and we'll send you a link to reset your password</p>
       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetForm />
        <div className="flex justify-center mt-10">
          <a className="inline-flex items-center space-x-2 mr-1 cursor-pointer" href="/login" >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-orange-600 hover-orange-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
           </svg>
           <p className="text-center font-semibold text-sm text-orange-600 cursor-pointer hover-orange-500">Back to Login</p>
         </a>
       </div>
      </div>
    </div>
  )
}