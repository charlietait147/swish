import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountReviewCard from "../../../components/account/AccountReviewCard.jsx";

jest.mock("date-fns", () => ({
  formatDistanceToNowStrict: jest.fn(() => "a few seconds"),
}));

describe("AccountReviewCard Component", () => {
  describe("Props tests", () => {
    it("should render the correct review props", () => {
      const cafeName = "Cafe 1";
      const reviewDescription = "Great cafe";
      const reviewTimestamp = new Date();
      const reviewImage = "review.jpg";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";

      render(
        <AccountReviewCard
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewTimestamp={reviewTimestamp}
          reviewImage={reviewImage}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
        />
      );
      expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Great cafe/i)).toBeInTheDocument();
      expect(screen.getByText(/a few seconds ago/i)).toBeInTheDocument();
      expect(screen.getByAltText(/review photo/i)).toBeInTheDocument();
    });
  });
  describe("Functionality tests", () => {
    it("should open the edit form when the edit button is clicked", async () => {
      const cafeName = "Cafe 1";
      const reviewDescription = "Great cafe";
      const reviewTimestamp = new Date();
      const reviewImage = "review.jpg";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";

      render(
        <AccountReviewCard
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewTimestamp={reviewTimestamp}
          reviewImage={reviewImage}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
        />
      );

      const editButton = screen.getByRole("button", { name: /edit-review/i });
      expect(editButton).toBeInTheDocument();

      // Click the edit button
      await userEvent.click(editButton);

      // Assert that the edit form is rendered
      await waitFor(() => {
        expect(
          screen.getByRole("dialog", { name: /edit-review/i })
        ).toBeInTheDocument();
      });
    });
    it("should open the delete alert box when the delete button is clicked", async () => {
      const cafeName = "Cafe 1";
      const reviewDescription = "Great cafe";
      const reviewTimestamp = new Date();
      const reviewImage = "review.jpg";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";

      render(
        <AccountReviewCard
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewTimestamp={reviewTimestamp}
          reviewImage={reviewImage}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
        />
      );

      const deleteButton = screen.getByRole("button", {
        name: /delete-review/i,
      });
      expect(deleteButton).toBeInTheDocument();

      // Click the delete button
      await userEvent.click(deleteButton);

      // Assert that the delete alert is rendered
      await waitFor(() => {
        expect(
          screen.getByRole("alertdialog", { name: /delete-review/i })
        ).toBeInTheDocument();
      });
    });
  });
});
