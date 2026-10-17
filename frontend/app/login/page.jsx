import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo/swish-orange-logo.jpeg";
import AuthLayout from "@/components/authentication/AuthLayout";
import LoginForm from "@/components/authentication/LoginForm";
export default function Login() {
  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" aria-label="Swish home" className="mx-auto block w-fit">
          <Image
            src={Logo}
            alt="Swish Logo"
            priority={true}
            className="mx-auto h-24 w-24"
          />
        </Link>

        <h2 className="mt-6 text-center text-[27px] font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <p className="mt-10 text-center text-[15px] text-gray-500">
          Not a member?
          <a
            href="/register"
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
          >
            {" "}
            Register your account{" "}
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
