import Image from "next/image";
import Logo from "../public/logo/swish-updated-logo.jpeg";
import { useRouter } from "next/navigation";

function SignInModal({ toggleModalClose }) {
    const router = useRouter();

    const handleSignIn = () => {
        router.push("/login");
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-full w-full flex-col px-6 py-20 lg:h-auto bg-orange-500 rounded-md shadow-lg sm:w-3/4 sm:h-min md:w-1/2 lg:w-1/3 relative">
        <button
          type="button"
          aria-controls="drawer-navigation"
          aria-label="close menu"
          className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 absolute top-5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleModalClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src={Logo}
            alt="Swish Logo"
            priority={true}
            className="mx-auto h-16 w-16"
          />
          <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-normal text-white">
            Making a list? Log in to add your saves to a trip you can edit or
            share.
          </h2>
            <button onClick={handleSignIn} className="mt-8 w-full bg-white text-orange-500 py-3 rounded-md font-semibold relative hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 absolute left-3 bottom-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Continue with email
            </button>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
