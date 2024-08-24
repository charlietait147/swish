import Logo from "../../public/logo/swish-logo.png";
import Image from "next/image";

function AccountOverview({ email, cafesLength, reviewsLength }) {
  return (
    <div>
      <div className="bg-gray-200 pt-16 pb-3">
        <div className="max-width mx-auto px-4">
          <h1 className="font-semibold text-2xl text-gray-800 text-center md:text-3xl">
            My Account
          </h1>
        </div>
      </div>
      {/* <div className="bg-white md:bg-gray-200 md:px-8"> */}
        <div className="bg-white py-3 shadow-lg max-w-screen-lg mx-auto md:pb-6 md:pt-4">
          <div className="flex flex-row items-center px-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-xl border border-gray-300">
              <Image src={Logo} alt="Account Avatar" className="w-14 h-14" />
            </div>
            <h1 className="font-light text-gray-700 text-sm ml-2">{email}</h1>
          </div>
          <div className="flex justify-center">
            <button className="border border-gray-200 rounded-md py-2 px-4 bg-gray-100 text-sm font-semibold cursor-pointer">
              Update password
            </button>
          </div>
          <div className="border border-1 border-gray-200 mt-4"></div>
          <div className="flex flex-row justify-around p-4">
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-sm">My Reviews</h3>
              <h3 className="font-semibold text-xl text-gray-500">
                {reviewsLength}
              </h3>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-sm ">My Saved Cafe's</h3>
              <h3 className="font-semibold text-xl text-gray-500">
                {cafesLength}
              </h3>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default AccountOverview;
