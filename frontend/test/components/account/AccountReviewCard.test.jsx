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
          screen.getByRole("dialog", { name: /edit-form/i })
        ).toBeInTheDocument();
      });
    });
    it("should close the edit form when the cancel button is clicked", async () => {
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
          screen.getByRole("dialog", { name: /edit-form/i })
        ).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();

      // Click the close button
      await userEvent.click(cancelButton);

      // Assert that the edit form is closed
      await waitFor(() => {
        expect(
          screen.queryByRole("dialog", { name: /edit-form/i })
        ).not.toBeInTheDocument();
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

    it("should close the delete modal when the cancel button is clicked", async () => {
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

      await userEvent.click(deleteButton);

      await waitFor(() => {
        expect(
          screen.getByRole("alertdialog", { name: /delete-review/i })
        ).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();

      await userEvent.click(cancelButton);

      await waitFor(() => {
        expect(
          screen.queryByRole("alertdialog", { name: /delete-review/i })
        ).not.toBeInTheDocument();
      });
    });
  });
});
