import { render, screen, waitFor, act } from "@testing-library/react";
import AccountPage from "../../app/account/page.jsx";
import { fetchUserData } from "../../services/user.service.jsx";
import Cookies from "js-cookie";
import { notFound } from "next/navigation.js";

jest.mock("../../services/user.service", () => ({
  fetchUserData: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  notFound: jest.fn(),
}));

describe("AccountPage Component", () => {
  describe("User data fetching tests", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should render the loading spinner while fetching the user data", async () => {
      Cookies.get.mockReturnValueOnce("839429f778gfd8gf8387gd");

      fetchUserData.mockReturnValueOnce(null);

      render(<AccountPage />);

      const loadingSpinner = screen.getByAltText(/Swish Logo Spinning/i);

      await waitFor(() => {
        expect(loadingSpinner).toBeInTheDocument();
      });
    });

    it("should call notFound() when an error occurs", async () => {
      Cookies.get.mockReturnValueOnce("839429f778gfd8gf8387gd");

      fetchUserData.mockRejectedValueOnce(new Error("User not found"));

      render(<AccountPage />);

      await waitFor(() => {
        expect(notFound).toHaveBeenCalled(); // Check that notFound was called
      });
    });

    it("should render the user data when it is fetched successfully", async () => {
      Cookies.get.mockReturnValueOnce("839429f778gfd8gf8387gd");

      const mockUserData = {
        email: "test@gmail.com",
        cafes: [
          { id: "1", name: "Cafe 1" },
          { id: "2", name: "Cafe 2" },
        ],
        reviews: [
          {
            _id: "1",
            cafes: [{ _id: "1", name: "Cafe 1" }],
            name: "User",
            description: "Great cafe!",
            timestamp: new Date(),
          },
        ],
      };

      fetchUserData.mockResolvedValueOnce(mockUserData);

      render(<AccountPage />);

      await waitFor(() => {
        expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
        expect(
          screen.getByText(mockUserData.cafes[0].name)
        ).toBeInTheDocument();
        expect(
          screen.getByText(mockUserData.reviews[0].description)
        ).toBeInTheDocument();
        expect(
          screen.queryByText(mockUserData.reviews[0].name)
        ).not.toBeInTheDocument();
      });
    });
    it("should re-fetch data when reviewsUpdated or cafesUpdated change", async () => {
      // Mock the cookie and initial data
      Cookies.get.mockReturnValueOnce("839429f778gfd8gf8387gd");

      const mockUserData = {
        email: "test@gmail.com",
        cafes: [
          { id: "1", name: "Cafe 1" },
          { id: "2", name: "Cafe 2" },
        ],
        reviews: [
          {
            _id: "1",
            cafes: [{ _id: "1", name: "Cafe 1" }],
            name: "User",
            description: "Great cafe!",
            timestamp: new Date(),
          },
        ],
      };

      // First data fetch
      fetchUserData.mockResolvedValueOnce(mockUserData);

      render(<AccountPage />);

      // Wait for the initial render and data fetch
      await waitFor(() => {
        expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
        expect(
          screen.getByText(mockUserData.cafes[0].name)
        ).toBeInTheDocument();
      });

      // Simulate reviewsUpdated and cafesUpdated being triggered by a review or cafe change
      await act(async () => {
        fetchUserData.mockResolvedValueOnce({
          ...mockUserData,
          cafes: [{ id: "1", name: "Updated Cafe 1" }],
        });

        //Simulate a review or cafe change update
        const reviewsUpdated = true;
        const cafesUpdated = true;

        // Re-render component after state update
        render(
          <AccountPage
            reviewsUpdated={reviewsUpdated}
            cafesUpdated={cafesUpdated}
          />
        );
      });

      // Wait for the re-fetch and assert that data has been updated
      await waitFor(() => {
        expect(fetchUserData).toHaveBeenCalledTimes(2); // First load + update
        expect(screen.getByText("Updated Cafe 1")).toBeInTheDocument(); // Cafe name should be updated
      });
    });
  });
  describe("User navigation tests", () => {
    it("should navigate to the home page when no user is logged in", async () => {
      Cookies.get.mockReturnValueOnce(null);

      fetchUserData.mockReturnValueOnce(null);

      render(<AccountPage />);

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith("/");
      });
    });
  });
});
