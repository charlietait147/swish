import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Cafe from '../models/cafe.model.js';

export const addReviewService = async (cafeId, userId, reviewData) => {
    try {
        const cafe = await Cafe.findById(cafeId);
        if (!cafe) {
            throw new Error('Cafe not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const newReview = new Review({
            user: userId,
            cafe: cafeId,
            ...reviewData,
        });

        await newReview.save();

        // $push only touches the reviews array, so unrelated missing fields on older docs can't fail the request
        await User.updateOne({ _id: userId }, { $push: { reviews: newReview._id } });
        // The first review's name becomes the account name so later review forms can pre-fill it
        await User.updateOne(
            { _id: userId, $or: [{ name: { $exists: false } }, { name: null }, { name: "" }] },
            { $set: { name: newReview.name.trim() } }
        );
        await Cafe.updateOne({ _id: cafeId }, { $push: { reviews: newReview._id } });

        return newReview;

    } catch (error) {
        throw new Error(error.message);
    }

    };

export const editReviewService = async (reviewId, userId, reviewData) => {
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }

        if (review.user.toString() !== userId.toString()) { 
            throw new Error('You are not authorized to edit this review');
        } 

        if (reviewData.name) review.name = reviewData.name;
        if (reviewData.description) review.description = reviewData.description;

        const updatedReview = await review.save();

        return updatedReview;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteReviewService = async (reviewId, userId) => {
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }

        if (review.user.toString() !== userId.toString()) {
            throw new Error('You are not authorized to delete this review');
        }

        await review.deleteOne();
        return { message: 'Review deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}
