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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the loading spinner while fetching the user data", async () => {
    fetchUserData.mockReturnValueOnce(null);

    render(<AccountPage />);

    const loadingSpinner = screen.getByAltText(/Swish Logo Spinning/i);

    await waitFor(() => {
      expect(loadingSpinner).toBeInTheDocument();
    });
  });

  it("should call notFound() when an error occurs", async () => {
    fetchUserData.mockRejectedValueOnce(new Error("User not found"));

    render(<AccountPage />);

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled(); // Check that notFound was called
    });
  });

  it("should render the user data when it is fetched successfully", async () => {
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
      expect(screen.getByText(mockUserData.cafes[0].name)).toBeInTheDocument();
      expect(
        screen.getByText(mockUserData.reviews[0].description)
      ).toBeInTheDocument();
      expect(screen.queryByText(mockUserData.reviews[0].name)).not.toBeInTheDocument();
    });
  });
});
