import Image from "next/image";
import Logo from "../../public/logo/swish-logo.png";
import RegisterForm from "@/components/authentication/RegisterForm";
export default function Register() {
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
          Register for an account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Have an account?
          <a
            href="#"
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
          >
            {" "}
             Sign in {" "}
          </a>
        </p>
      </div>
    </div>
  );
}
