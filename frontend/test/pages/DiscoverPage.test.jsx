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
    it("should render the loading spinner while fetching cafes", async () => {
      fetchCafes.mockReturnValueOnce([]);

      render(<DiscoverPage />);

      const loadingSpinner = screen.getByAltText(/Swish Logo Spinning/i);

      await waitFor(() => {
        expect(loadingSpinner).toBeInTheDocument();
      });
    });

    it("should render the cafes when they are fetched", async () => {
      fetchCafes.mockResolvedValue(mockCafeData);

      render(<DiscoverPage />);

      //Expect loading spinner to be rendered initially
      expect(screen.getByAltText("Swish Logo Spinning")).toBeInTheDocument();

      //Expect cafes to be fetched and rendered
      await waitFor(() => {
        expect(fetchCafes).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cafe 2/i)).toBeInTheDocument();
        expect(
          screen.queryByAltText("Swish Logo Spinning")
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
    
        const nameInput = screen.getByLabelText(/Name/i);
        await userEvent.type(nameInput, "Cafe 1");

        const applyButton = screen.getByRole("button", { name: /Apply Filters/i });
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
        
            const locationInput = screen.getByLabelText(/Location/i);
            await userEvent.type(locationInput, "Location 2");
    
            const applyButton = screen.getByRole("button", { name: /Apply Filters/i });
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
    
        const toggleDropdown = screen.getByTestId("amenities-dropdown");
        await userEvent.click(toggleDropdown);

        const amenityButton1 = screen.getByRole("button", { name: /Onsite Parking/i });
        const amenityButton2 = screen.getByRole("button", { name: /Hot Food Available/i });
        await userEvent.click(amenityButton1);

        const applyButton = screen.getByRole("button", { name: /Apply Filters/i });
        await userEvent.click(applyButton);
    
        await waitFor(() => {
            expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Cafe 2/i)).not.toBeInTheDocument();
            });
        });

    it("should reset filters when the Reset Filters button is clicked", async () => {
        fetchCafes.mockResolvedValue(mockCafeData);
    
        render(<DiscoverPage />);
    
        await waitFor(() => {
            expect(fetchCafes).toHaveBeenCalledTimes(1);
        });
    
        const nameInput = screen.getByLabelText(/Name/i);
        await userEvent.type(nameInput, "Cafe 1");

        const locationInput = screen.getByLabelText(/Location/i);
        await userEvent.type(locationInput, "Location 2");

        const toggleDropdown = screen.getByTestId("amenities-dropdown");
        await userEvent.click(toggleDropdown);

        const amenityButton1 = screen.getByRole("button", { name: /Onsite Parking/i });
        const amenityButton2 = screen.getByRole("button", { name: /Hot Food Available/i });
        await userEvent.click(amenityButton1);

        const resetButton = screen.getByRole("button", { name: /Clear Filters/i });
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
    
        const nameInput = screen.getByLabelText(/Name/i);
        await userEvent.type(nameInput, "Cafe 1");

        const locationInput = screen.getByLabelText(/Location/i);
        await userEvent.type(locationInput, "Location 1");

        const toggleDropdown = screen.getByTestId("amenities-dropdown");
        await userEvent.click(toggleDropdown);

        const amenityButton1 = screen.getByRole("button", { name: /Onsite Parking/i });
        const amenityButton2 = screen.getByRole("button", { name: /Hot Food Available/i });
        await userEvent.click(amenityButton1);

        const applyButton = screen.getByRole("button", { name: /Apply Filters/i });
        await userEvent.click(applyButton);
    
        await waitFor(() => {
            expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/Cafe 2/i)).not.toBeInTheDocument();
        });
    });
  });
});
