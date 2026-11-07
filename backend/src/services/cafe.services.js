import Cafe from '../models/cafe.model.js';

export const getAllCafesService = async () => {
    try {
        return await Cafe.find().populate(`reviews`);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getSingleCafeService = async (cafeId) => {
    try {
        // Only the reviewer's avatar is selected so emails and passwords never reach the cafe page
        return await Cafe.findById(cafeId).populate({
            path: 'reviews',
            populate: { path: 'user', select: 'avatar' },
        });
    } catch (error) {
        throw new Error(error.message);
    }
}
