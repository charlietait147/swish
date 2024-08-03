import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

function CafeMapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });
  const center = useMemo(
    () => ({
      lat: 51.51081,
      lng: -0.59356,
    }),
    []
  );
  return (
    <div className="container px-4 flex flex-col gap-3 pb-6">
      <h1 className="text-xl font-semibold">Location</h1>
      <div className="map">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            zoom={18}
            center={center}
            mapContainerClassName="w-full h-72"
          >
            <Marker
              key="marker_1"
              position={{
                lat: 51.51072,
                lng: -0.5934,
              }}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default CafeMapContainer;

