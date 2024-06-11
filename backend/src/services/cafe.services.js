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
        return await Cafe.findById(cafeId).populate(`reviews`);
    } catch (error) {
        throw new Error(error.message);
    }
}
