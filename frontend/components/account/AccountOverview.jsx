import Logo from "../../public/logo/swish-logo.png";
import Image from "next/image";

function AccountOverview() {
  return (
    <div>
      <div className="bg-gray-300 pt-16 pb-3">
        <div className="container mx-auto px-4">
          <h1 className="font-semibold text-2xl text-gray-800 text-center">
            My Account
          </h1>
        </div>
      </div>

      <div className="bg-white py-3">
        <div className="flex flex-row items-center px-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-xl border border-gray-300">
            <Image src={Logo} alt="Account Avatar" className="w-14 h-14" />
          </div>
          <h1 className="font-light text-gray-700 text-sm ml-2">
            charlietait1@gmail.com
          </h1>
        </div>
        <div className="flex justify-center">
        <button className="border border-gray-200 rounded-md py-2 px-4 bg-gray-100 text-sm mt-2 font-semibold cursor-pointer">Update password</button>
        </div>
        <div className="border border-1 border-gray-200 mt-3"></div>
        <div className="flex flex-row justify-around pt-3 px-4">
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-sm">My Reviews</h3>
            <h3 className="font-semibold text-xl text-gray-500">0</h3>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-sm ">My Saved Cafe's</h3>
            <h3 className="font-semibold text-xl text-gray-500">0</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountOverview;
