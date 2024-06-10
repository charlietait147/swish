import { addReviewService, editReviewService, deleteReviewService } from "../services/review.services.js";

export const addReviewController = async (req, res) => {
    try {
        const { cafeId } = req.params;
        const { description, name } = req.body;
        const userId = req.user._id;

        const newReview = await addReviewService(cafeId, userId, { description, name });
        res.status(201).json({message: "Review added successfully", review: newReview});
    } catch (error) {
        res.status(400).send("Review failed");
        console.error("Review failed", error);
    }
}

export const editReviewController = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { description, name } = req.body;
        const userId = req.user._id;

        const updatedReview = await editReviewService(reviewId, userId, { description, name });
        res.status(200).json({message: "Review updated successfully", review: updatedReview});
    } catch (error) {
        res.status(400).send("Review update failed");
        console.error("Review update failed", error);
    }
}

export const deleteReviewController = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;

        await deleteReviewService(reviewId, userId);
        res.status(200).json({message: "Review deleted successfully"});
    } catch (error) {
        res.status(400).send("Review delete failed");
        console.error("Review delete failed", error);
    }
}