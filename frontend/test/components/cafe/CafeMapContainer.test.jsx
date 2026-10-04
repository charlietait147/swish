import { render, screen } from "@testing-library/react";
import CafeMapContainer from "../../../components/cafe/CafeMapContainer.jsx";
import { Map, AdvancedMarker, APIProvider, useApiLoadingStatus } from "@vis.gl/react-google-maps";

jest.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: jest.fn(({ children }) => <div>{children}</div>),
  Map: jest.fn(({ children }) => <div>{children}</div>),
  AdvancedMarker: jest.fn(() => <div />),
  useApiLoadingStatus: jest.fn(),
  APILoadingStatus: {
    NOT_LOADED: "NOT_LOADED",
    LOADING: "LOADING",
    LOADED: "LOADED",
    FAILED: "FAILED",
    AUTH_FAILURE: "AUTH_FAILURE",
  },
}));

describe("CafeMapContainer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show the loading text when the map is not loaded", () => {
    useApiLoadingStatus.mockReturnValue("LOADING");

    render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(Map).not.toHaveBeenCalled();
  });

  it("should load the API with the demo key", () => {
    const originalKey = process.env.MAPS_DEMO_KEY;
    process.env.MAPS_DEMO_KEY = "test-demo-key";
    useApiLoadingStatus.mockReturnValue("LOADING");

    render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);

    expect(APIProvider).toHaveBeenCalledWith(
      expect.objectContaining({ apiKey: "test-demo-key" }),
      {}
    );
    process.env.MAPS_DEMO_KEY = originalKey;
  });

  it("should render the map and advanced marker when the map is loaded", () => {
    useApiLoadingStatus.mockReturnValue("LOADED");

    render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);

    expect(Map).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultZoom: 14,
        defaultCenter: { lat: 12.34, lng: 56.78 },
        mapId: "DEMO_MAP_ID",
        className: "w-full h-80 sm:h-96 md:h-120 lg:h-132",
      }),
      {}
    );
    expect(AdvancedMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        position: { lat: 12.34, lng: 56.78 },
      }),
      {}
    );
  });

  it.each(["FAILED", "AUTH_FAILURE"])(
    "should show an error message instead of loading forever when the status is %s",
    (status) => {
      useApiLoadingStatus.mockReturnValue(status);

      render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);

      expect(screen.getByText(/The map couldn't be loaded/i)).toBeInTheDocument();
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(Map).not.toHaveBeenCalled();
    }
  );

  it("should re-centre the map when the cafe changes", () => {
    useApiLoadingStatus.mockReturnValue("LOADED");

    const { rerender } = render(<CafeMapContainer cafe={{ lat: 12.34, lng: 56.78 }} />);
    rerender(<CafeMapContainer cafe={{ lat: 51.5, lng: -0.12 }} />);

    expect(Map).toHaveBeenLastCalledWith(
      expect.objectContaining({ defaultCenter: { lat: 51.5, lng: -0.12 } }),
      {}
    );
    expect(AdvancedMarker).toHaveBeenLastCalledWith(
      expect.objectContaining({ position: { lat: 51.5, lng: -0.12 } }),
      {}
    );
  });
});
