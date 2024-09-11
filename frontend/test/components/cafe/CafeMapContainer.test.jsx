import { render, screen, waitFor } from "@testing-library/react";
import CafeMapContainer from "../../../components/cafe/CafeMapContainer.jsx";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

jest.mock("@react-google-maps/api", () => ({
  useLoadScript: jest.fn(),
  GoogleMap: jest.fn(({ children }) => <div>{children}</div>),
  Marker: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("CafeMapContainer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show the loading text when the map is not loaded", () => {
    require("@react-google-maps/api").useLoadScript.mockReturnValue({
      isLoaded: false,
    });

    render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should render the map and marker when the map is loaded", async () => {
    require("@react-google-maps/api").useLoadScript.mockReturnValue({
      isLoaded: true,
    });

    render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);

    await waitFor(() => {
      expect(GoogleMap).toHaveBeenCalledTimes(1);
      expect(Marker).toHaveBeenCalledTimes(1);
    });

    expect(GoogleMap).toHaveBeenCalledWith(
      expect.objectContaining({
        zoom: 14,
        center: { lat: 12.34, lng: 56.78 },
        mapContainerClassName: "w-full h-80 sm:h-96 md:h-120 lg:h-132",
      }),
      {}
    );
    expect(Marker).toHaveBeenCalledWith(
      expect.objectContaining({
        position: { lat: 12.34, lng: 56.78 },
      }),
      {}
    );
  });
});
