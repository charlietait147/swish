import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountEditReviewForm from "../../../components/account/AccountEditReviewForm.jsx";
import { editReview } from "../../../services/review.service.jsx";
import Cookies from "js-cookie";

jest.mock("../../../services/review.service.jsx", () => ({
  editReview: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe("AccountEditReviewForm Component", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe("Props tests", () => {
    it("should render the correct review props", () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      const cafeName = "Cafe 1";
      const reviewDescription = "Great cafe";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";
      const onClose = jest.fn();

      render(
        <AccountEditReviewForm
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
          onClose={onClose}
        />
      );
      expect(screen.getByText(/Cafe 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Great cafe/i)).toBeInTheDocument();
    });
  });
  describe("Form tests", () => {
    it("disables the submit button when the form is incomplete", () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      const cafeName = "";
      const reviewDescription = "";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";
      const onClose = jest.fn();

      render(
        <AccountEditReviewForm
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
          onClose={onClose}
        />
      );

      const submitButton = screen.getByRole("button", { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it("updates the input values when typing", async () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      const cafeName = "Cafe 1";
      const reviewDescription = "";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "";
      const onClose = jest.fn();

      render(
        <AccountEditReviewForm
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
          onClose={onClose}
        />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      const reviewInput = screen.getByLabelText(/Review/i);

      await userEvent.type(nameInput, "Test");
      await userEvent.type(reviewInput, "Great cafe!");

      await waitFor(() => {
        expect(nameInput.value).toBe("Test");
        expect(reviewInput.value).toBe("Great cafe!");
      });
    });

    it("should call the editReview service when the form is submitted and load a successful message", async () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      const cafeName = "Cafe 1";
      const reviewDescription = "Great cafe!";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";
      const onClose = jest.fn();

      editReview.mockResolvedValue({ data: { message: "Review updated" } });

      render(
        <AccountEditReviewForm
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
          onClose={onClose}
        />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      const reviewInput = screen.getByLabelText(/Review/i);

      await userEvent.type(nameInput, " 2");
      await userEvent.type(reviewInput, " I loved it here.");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(editReview).toHaveBeenCalledWith(
          "1",
          "Test 2",
          "Great cafe! I loved it here."
        );
        expect(screen.getByText(/Successfully updated!/i)).toBeInTheDocument();
      });
    });

    it("should display an error message if the editReview service fails", async () => {
      Cookies.get.mockReturnValue("839429f778gfd8gf8387gd");

      editReview.mockRejectedValue(new Error("Network Error"));

      const cafeName = "Cafe 1";
      const reviewDescription = "Great cafe!";
      const reviewId = "1";
      const setReviewsUpdated = jest.fn();
      const reviewName = "Test";
      const onClose = jest.fn();

      render(
        <AccountEditReviewForm
          cafeName={cafeName}
          reviewDescription={reviewDescription}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
          reviewName={reviewName}
          onClose={onClose}
        />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      const reviewInput = screen.getByLabelText(/Review/i);

      await userEvent.type(nameInput, " 2");
      await userEvent.type(reviewInput, " I loved it here.");

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
      });
    });
  });
});
