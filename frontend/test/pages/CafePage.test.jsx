import { render, screen, waitFor } from "@testing-library/react";
import CafePage from "../../app/cafe/[cafeId]/page.jsx";
import { fetchCafe } from "../../services/cafe.service.jsx";
import { useParams, notFound } from "next/navigation";

jest.mock("../../services/cafe.service", () => ({
  fetchCafe: jest.fn(),
}));

jest.mock("../../services/review.service", () => ({
    addReview: jest.fn(),
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useParams: jest.fn(),
  notFound: jest.fn(),
}));

describe("CafePage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockParams = { cafeId: "1" };
    require("next/navigation").useParams.mockReturnValue(mockParams);

    fetchCafe.mockReturnValue({
      _id: 1,
      name: "Cafe 1",
      description: "A great cafe",
      website: "cafe1@gmail.com",
      image: "cafe1.jpg",
      address: "Town 1",
      reviews: [],
    });
  });

  it("should render the loading spinner while fetching the cafe", async () => {
    fetchCafe.mockReturnValueOnce(null);

    render(<CafePage />);

    const loadingSpinner = screen.getByAltText(/Swish Logo Spinning/i);

    await waitFor(() => {
      expect(loadingSpinner).toBeInTheDocument();
    });
  });

  it("should call notFound() when an error occurs", async () => {
    // Mock fetchCafe to return null (simulating not found data)
    fetchCafe.mockRejectedValueOnce(new Error("Cafe not found"));

    render(<CafePage />);

    // Wait for the component to handle the error
    await waitFor(() => {
      expect(notFound).toHaveBeenCalled(); // Check that notFound was called
    });
  });

  it("should render the cafe when it is fetched", async () => {
      fetchCafe.mockResolvedValue({
        _id: 1,
        name: "Cafe 1",
        description: "A great cafe",
        location: "Town 1",
        website: "cafe1@gmail.com",
        image: "cafe1.jpg",
        address: 'Address 1',
        reviews: [],
      });

      render(<CafePage />);

      //Expect loading spinner to be rendered initially
      expect(screen.getByAltText("Swish Logo Spinning")).toBeInTheDocument();

      //Expect cafe to be fetched and rendered
      await waitFor(() => {
          expect(fetchCafe).toHaveBeenCalledTimes(1);
          expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();

          const firstDescription = screen.getAllByText(/great cafe/i)[0];
          expect(firstDescription).toBeInTheDocument();

          expect(screen.getByText(/Town 1/i)).toBeInTheDocument();
          expect(screen.getByText(/cafe1@gmail.com/i)).toBeInTheDocument();
          expect(screen.getByAltText(/Cafe 1/i)).toBeInTheDocument();
          expect(screen.getByText(/Address 1/i)).toBeInTheDocument();
          expect(
              screen.queryByAltText("Swish Logo Spinning")
          ).not.toBeInTheDocument();
      });
  });
});
