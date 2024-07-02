import Image from "next/image";
import CafeInterior from "../../public/images/cafe-interior-discover.jpg";
function DiscoverCafeHero() {
  return (
    <>
    <div className="relative mt-16 w-full h-60 ">
      <Image
        src={CafeInterior}
        alt="Cafe Interior"
        className="w-full h-full object-cover"
        priority={true}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
        <h1 className="text-2xl font-semibold">Discover</h1>
      </div>
    </div>
    {/* <div className=" bg-orange-500 text-white p-2  flex flex-row px-2 mt-4 text-center">
    <p className="text-sm pl-0.5">
      {" "}
      Explore the best cafes in Hampshire and Surrey. Find hidden gems,
      enjoy cosy atmospheres, and savour the finest coffee. Start your cafe
      journey today!
    </p>
  </div> */}
  </>
  );
}

export default DiscoverCafeHero;
