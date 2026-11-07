import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeReviewForm from "../../../components/cafe/CafeReviewForm.jsx";
import { addReview } from "../../../services/review.service.jsx";
import { fetchUserData } from "../../../services/user.service.jsx";

const ue = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

jest.mock("../../../services/review.service.jsx", () => ({
  addReview: jest.fn(),
}));

jest.mock("../../../services/user.service.jsx", () => ({
  fetchUserData: jest.fn(),
}));

describe("CafeReviewForm Component", () => {
  const mockOnClose = jest.fn();
  const mockSetReviewsUpdated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    fetchUserData.mockResolvedValue({});
  });

  describe("prop tests", () => {
    it("should render the form with the correct props", () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );
      expect(screen.getByText(/Test Cafe/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Review/i)).toBeInTheDocument();
      expect(screen.queryByText(/Upload a Photo/i)).not.toBeInTheDocument();
    });
  });

  describe("form tests", () => {
    it("updates the input values when typing", async () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
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

    it("disables the submit button when the form is incomplete", () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      const submitButton = screen.getByText(/Submit/i);

      // Initially, the submit button should be disabled
      expect(submitButton).toBeDisabled();
    });

    it("submits the form, calls the addReview service and loads a successful alert message", async () => {
      addReview.mockResolvedValue({ data: "Review added successfully" });

      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      const reviewInput = screen.getByLabelText(/Review/i);

      await userEvent.type(nameInput, "Test");
      await userEvent.type(reviewInput, "Great cafe!");
      await userEvent.click(screen.getByRole("radio", { name: "4 stars" }));

      const submitButton = screen.getByText(/Submit/i);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(addReview).toHaveBeenCalledWith("1", { name: "Test", description: "Great cafe!", rating: 4 });
        expect(mockSetReviewsUpdated).toHaveBeenCalledWith(true);
        expect(screen.getByRole("alertdialog")).toHaveTextContent(
          "Thank you for your review!"
        );
      });
    });
    it("displays an error when there is an error calling the AddReview service", async () => {
      addReview.mockRejectedValueOnce(new Error("Network Error"));

      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      const nameInput = screen.getByLabelText(/Name/i);
      const reviewInput = screen.getByLabelText(/Review/i);

      await userEvent.type(nameInput, "Test");
      await userEvent.type(reviewInput, "Great cafe!");
      await userEvent.click(screen.getByRole("radio", { name: "4 stars" }));

      const submitButton = screen.getByText(/Submit/i);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Network Error")).toBeInTheDocument();
      });
    });

    it("closes the form when the cancel button is clicked", async () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      const cancelButton = screen.getByText(/Cancel/i);
      await userEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe("rating tests", () => {
    it("keeps the submit button disabled until a rating is chosen", async () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      await userEvent.type(screen.getByLabelText(/Name/i), "Test");
      await userEvent.type(screen.getByLabelText(/Review/i), "Great cafe!");
      const submitButton = screen.getByText(/Submit/i);
      expect(submitButton).toBeDisabled();

      await userEvent.click(screen.getByRole("radio", { name: "3 stars" }));
      expect(submitButton).not.toBeDisabled();
      expect(screen.getByRole("radio", { name: "3 stars" })).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("name prefill tests", () => {
    it("pre-fills the name from the user's account", async () => {
      fetchUserData.mockResolvedValue({ name: "Jane Doe" });

      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      await waitFor(() => {
        expect(screen.getByLabelText(/Name/i).value).toBe("Jane Doe");
      });
    });

    it("leaves the name empty when the account has no name", async () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      await waitFor(() => expect(fetchUserData).toHaveBeenCalled());
      expect(screen.getByLabelText(/Name/i).value).toBe("");
    });
  });
});
