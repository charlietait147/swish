import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import Link from "next/link";

function CafeMapContainer({ cafe }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });
  const center = useMemo(
    () => ({
      lat: cafe && cafe.lat,
      lng: cafe && cafe.lng,
    }),
    []
  );
  return (
    <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 lg:pt-6 xl:px-0 px-4 flex flex-col gap-3 pb-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold">Location</h1>
        <div className="flex flex-row gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              cafe?.address
            )}`}
            className="text-gray-800 text-sm hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {cafe?.address}
          </Link>
        </div>
      </div>
      <div className="map">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            zoom={14}
            center={center}
            mapContainerClassName="w-full h-80 sm:h-96 md:h-120 lg:h-132"
          >
            <Marker
              key="marker_1"
              position={{
                lat: cafe && cafe.lat,
                lng: cafe && cafe.lng,
              }}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default CafeMapContainer;
