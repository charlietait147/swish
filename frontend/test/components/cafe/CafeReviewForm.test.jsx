import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeReviewForm from "../../../components/cafe/CafeReviewForm.jsx";
import { addReview } from "../../../services/review.service.jsx";

const ue = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

jest.mock("../../../services/review.service.jsx", () => ({
  addReview: jest.fn(),
}));

describe("CafeReviewForm Component", () => {
  const mockOnClose = jest.fn();
  const mockSetReviewsUpdated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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
      expect(screen.getByLabelText(/Upload a Photo/i)).toBeInTheDocument();
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

      const submitButton = screen.getByText(/Submit/i);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(addReview).toHaveBeenCalledWith("1", expect.any(FormData));
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

  describe("form tests", () => {
    it("allows the user to select and remove an image", async () => {
      render(
        <CafeReviewForm
          cafeId="1"
          cafeName="Test Cafe"
          onClose={mockOnClose}
          setReviewsUpdated={mockSetReviewsUpdated}
        />
      );

      const fileInput = screen.getByLabelText(/Upload a Photo/i);
      const testFile = new File(["test-image"], "test-image.png", {
        type: "image/png",
      });

      fireEvent.change(fileInput, { target: { files: [testFile] } });

      screen.debug();

      await waitFor(() => {
        expect(fileInput.files[0]).toBe(testFile);
        expect(fileInput.files[0].name).toBe("test-image.png");
      });
    
      const removeButton = screen.getByRole("button", { name: /remove-image/i });
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(fileInput.value).toBe(""); // Ensure the file input is empty
      });
    });
  });
});
