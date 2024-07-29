import { addReviewService, editReviewService, deleteReviewService } from "../services/review.services.js";

export const addReviewController = async (req, res) => {
    try {
        const { cafeId } = req.params;
        const { name, description } = req.body;
        const userId = req.user._id;
        const image = req.file ? req.file.filename : null;

        const newReview = await addReviewService(cafeId, userId, { name, description, image });
        res.status(201).json({message: "Review added successfully", review: newReview});
    } catch (error) {
        res.status(400).send("Review failed");
        console.error("Review failed", error);
    }
}

export const editReviewController = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { name, description } = req.body;
        const userId = req.user._id;

        const updatedReview = await editReviewService(reviewId, userId, { name, description });
        res.status(200).json({message: "Review updated successfully", review: updatedReview});
    } catch (error) {
        // res.status(400).send("Review update failed");
        res.status(400).json({error: error.message});
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
        // res.status(400).send("Review delete failed");
        res.status(400).json({error: error.message});
        console.error("Review delete failed", error);
    }
}