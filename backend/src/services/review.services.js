import Review from '../models/review.model.js';
import User from '../models/user.model.js';

export const addReviewService = async (cafeId, userId, reviewData) => {
    try {
        // const cafe = await Cafe.findById(cafeId);
        // if (!cafe) {
        //     throw new Error('Cafe not found');
        // }

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

        user.reviews.push(newReview._id);
        await user.save();

        // cafe.reviews.push(newReview._id);
        // await cafe.save();

        return newReview;

    } catch (error) {
        throw new Error(error.message);
    }

    };
