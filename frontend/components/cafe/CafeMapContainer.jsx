import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

function CafeMapContainer({ cafe }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });
  const center = useMemo(
    () => ({
      lat: cafe.lat,
      lng: cafe.lng,
    }),
    []
  );
  return (
    <div className="container mx-auto px-4 flex flex-col gap-3 pb-6">
      <h1 className="text-xl font-semibold">Location</h1>
      <div className="map">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            zoom={14}
            center={center}
            mapContainerClassName="w-full h-72"
          >
            <Marker
              key="marker_1"
              position={{
                lat: cafe.lat,
                lng: cafe.lng,
              }}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default CafeMapContainer;

