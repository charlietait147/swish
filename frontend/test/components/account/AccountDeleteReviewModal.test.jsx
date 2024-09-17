import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountDeleteReviewModal from "../../../components/account/AccountDeleteReviewModal.jsx";
import { deleteReview } from "../../../services/review.service.jsx";

jest.mock("../../../services/review.service.jsx", () => ({
    deleteReview: jest.fn(),
    }));

describe("AccountDeleteReviewModal Component", () => {
    const mockOnClose = jest.fn();
    const mockSetReviewsUpdated = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("functionality tests", () => {
        it("should call the deleteReview function when the delete button is clicked", async () => {
            render(
                <AccountDeleteReviewModal
                    reviewId="1"
                    onClose={mockOnClose}
                    setReviewsUpdated={mockSetReviewsUpdated}
                />
            );

            const deleteButton = screen.getByRole("button", { name: /delete/i });
            await userEvent.click(deleteButton);

            await waitFor(() => {
                expect(deleteReview).toHaveBeenCalledTimes(1);
                expect(deleteReview).toHaveBeenCalledWith("1");
                expect(mockSetReviewsUpdated).toHaveBeenCalledTimes(1);
            });
        });
    });
});