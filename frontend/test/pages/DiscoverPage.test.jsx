import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiscoverPage from "../../app/discover/page.jsx";
import { fetchCafes } from "../../services/cafe.service.jsx";
import { mockCafeData } from "../data/testCafeData.js";

jest.mock("../../services/cafe.service", () => ({
  fetchCafes: jest.fn(),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("DiscoverPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

  describe("Cafe fetching tests", () => {
    it("should render the skeleton cards while fetching cafes", async () => {
      fetchCafes.mockReturnValueOnce([]);

      render(<DiscoverPage />);

      const loadingSkeleton = screen.getByTestId("cafe-list-skeleton");

      await waitFor(() => {
        expect(loadingSkeleton).toBeInTheDocument();
      });
    });

    it("should render the cafes when they are fetched", async () => {
      fetchCafes.mockResolvedValue(mockCafeData);

      render(<DiscoverPage />);

      //Expect skeleton cards to be rendered initially
      expect(screen.getByTestId("cafe-list-skeleton")).toBeInTheDocument();

      //Expect cafes to be fetched and rendered
      await waitFor(() => {
        expect(fetchCafes).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();
        expect(
          screen.queryByTestId("cafe-list-skeleton")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Filtering tests", () => {
    it("should filter cafes based on name", async () => {
        fetchCafes.mockResolvedValue(mockCafeData);
    
        render(<DiscoverPage />);
    
        await waitFor(() => {
            expect(fetchCafes).toHaveBeenCalledTimes(1);
        });
    
        const nameInput = screen.getByLabelText("Name");
        await userEvent.type(nameInput, "Cafe 1");

        const applyButton = screen.getByRole("button", { name: "Search" });
        await userEvent.click(applyButton);
    
        await waitFor(() => {
            expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Cafe 2/i)).not.toBeInTheDocument();
        });
    });

    it("should filter cafes based on location", async () => {
            fetchCafes.mockResolvedValue(mockCafeData);
        
            render(<DiscoverPage />
            );
        
            await waitFor(() => {
                expect(fetchCafes).toHaveBeenCalledTimes(1);
            });
        
            const locationInput = screen.getByLabelText("Location");
            await userEvent.type(locationInput, "Location 2");
    
            const applyButton = screen.getByRole("button", { name: "Search" });
            await userEvent.click(applyButton);
        
            await waitFor(() => {
                expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();
                expect(screen.queryByText(/Cafe 1/i)).not.toBeInTheDocument();
            });
        });

    it("should filter cafes based on amenities", async () => {
        fetchCafes.mockResolvedValue(mockCafeData);
    
        render(<DiscoverPage />);
    
        await waitFor(() => {
            expect(fetchCafes).toHaveBeenCalledTimes(1);
        });
    
        // const toggleDropdown = screen.getByTestId("amenities-dropdown");
        const toggleDropdown = screen.getByRole("button", { name: /amenities-dropdown/i });
        await userEvent.click(toggleDropdown);

        const amenityButton1 = screen.getAllByRole("button", { name: /Onsite Parking/i });
        const firstAmenityButton1 = amenityButton1[0];
        const amenityButton2 = screen.getAllByRole("button", { name: /Hot Food Available/i });
        const firstAmenityButton2 = amenityButton2[0];

        await userEvent.click(firstAmenityButton1);

        const applyButton = screen.getByRole("button", { name: "Search" });
        await userEvent.click(applyButton);
    
        await waitFor(() => {
            expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Cafe 2/i)).not.toBeInTheDocument();
            });
        });

    it("should reset filters when the Clear button is clicked", async () => {
        fetchCafes.mockResolvedValue(mockCafeData);
    
        render(<DiscoverPage />);
    
        await waitFor(() => {
            expect(fetchCafes).toHaveBeenCalledTimes(1);
        });
    
        const nameInput = screen.getByLabelText("Name");
        await userEvent.type(nameInput, "Cafe 1");

        const locationInput = screen.getByLabelText("Location");
        await userEvent.type(locationInput, "Location 2");

        // const toggleDropdown = screen.getByTestId("amenities-dropdown");
        const toggleDropdown = screen.getByRole("button", { name: /amenities-dropdown/i });
        await userEvent.click(toggleDropdown);

        const amenityButton1 = screen.getAllByRole("button", { name: /Onsite Parking/i });
        const firstAmenityButton1 = amenityButton1[0];
        const amenityButton2 = screen.getAllByRole("button", { name: /Hot Food Available/i });
        const firstAmenityButton2 = amenityButton2[0];

        await userEvent.click(firstAmenityButton1);

        const filtersModalButton = screen.getByRole("button", { name: /filters modal/i });
        await userEvent.click(filtersModalButton);

        const resetButton = screen.getByRole("button", { name: /clear modal filters/i });
        await userEvent.click(resetButton);
    
        await waitFor(() => {
            expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();
        });
    });

    it("should filter cafes based on multiple filters", async () => {
        fetchCafes.mockResolvedValue(mockCafeData);
    
        render(<DiscoverPage />);
    
        await waitFor(() => {
            expect(fetchCafes).toHaveBeenCalledTimes(1);
        });
    
        const nameInput = screen.getByLabelText("Name");
        await userEvent.type(nameInput, "Cafe 1");

        const locationInput = screen.getByLabelText("Location");
        await userEvent.type(locationInput, "Location 1");

        // const toggleDropdown = screen.getByTestId("amenities-dropdown");
        const toggleDropdown = screen.getByRole("button", { name: /amenities-dropdown/i });
        await userEvent.click(toggleDropdown);

        const amenityButton1 = screen.getAllByRole("button", { name: /Onsite Parking/i });
        const firstAmenityButton1 = amenityButton1[0];
        const amenityButton2 = screen.getAllByRole("button", { name: /Hot Food Available/i });
        const firstAmenityButton2 = amenityButton2[0];

        await userEvent.click(firstAmenityButton1);

        const applyButton = screen.getByRole("button", { name: "Search" });
        await userEvent.click(applyButton);
    
        await waitFor(() => {
            expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Cafe 2/i)).not.toBeInTheDocument();
        });
    });
  });
});
