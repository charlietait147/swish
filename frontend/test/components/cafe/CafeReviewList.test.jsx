import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeReviewList from "../../../components/cafe/CafeReviewList.jsx";
import Cookies from "js-cookie";

jest.mock("date-fns", () => ({
  formatDistanceToNowStrict: jest.fn(() => "1 day"),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe("CafeReviewList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("review list tests", () => {
    it("should display a message with no reviews yet if there are no reviews", () => {
      const cafe = { reviews: [] };
      render(<CafeReviewList cafe={cafe} />);

      expect(screen.getByText(/No reviews yet/i)).toBeInTheDocument();
    });

    it("should display a list of reviews when there are reviews", () => {
      const cafe = {
        reviews: [
          {
            id: 1,
            name: "Test",
            description: "Great cafe!",
            timestamp: new Date(),
            image: null,
          },
          {
            _id: 2,
            name: "Test 2",
            description: "Lovely cafe!",
            timestamp: new Date(),
            image: null,
          },
        ],
      };
      render(<CafeReviewList cafe={cafe} />);

      expect(screen.getByText(/Great cafe!/i)).toBeInTheDocument();
      expect(screen.getByText(/Lovely cafe!/i)).toBeInTheDocument();
      const dates = screen.getAllByText("1 day ago");
      expect(dates.length).toBe(2);
    });
  });
  describe("user state tests", () => {
    it("should render a Sign in link when the user is not logged in", () => {
      render(<CafeReviewList />);

      const loginLink = screen.getByText(/Sign in to add a review/i);

      expect(loginLink).toBeInTheDocument();
    });

    it("should render an Add Review button when the user is logged in", () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      render(<CafeReviewList />);

      const addReviewButton = screen.getByText(/Add a review/i);

      expect(addReviewButton).toBeInTheDocument();
    });
  });

  describe("add review button tests", () => {
    it("should display the AddReviewForm when the Add Review button is clicked", async () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      const cafe = { _id: "1", name: "Test Cafe", reviews: [] };

      const setReviewsUpdated = jest.fn();

      render(<CafeReviewList cafe={cafe}  setReviewsUpdated={setReviewsUpdated}   />);

      const addReviewButton = screen.getByText(/Add a review/i);
      userEvent.click(addReviewButton);

      await waitFor(() => {
        const formModal = screen.getByRole("dialog");
        expect(formModal).toBeInTheDocument();
      });
    });
  });
});
