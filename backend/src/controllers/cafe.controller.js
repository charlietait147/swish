import { getAllCafesService, getSingleCafeService } from "../services/cafe.services.js";

export const getAllCafesController = async (req, res) => {
    try {
        const cafes = await getAllCafesService();
        res.status(200).json(cafes);
    } catch (error) {
        res.status(400).send("Failed to fetch cafes");
        console.error("Failed to fetch cafes", error);
    }
}

export const getSingleCafeController = async (req, res) => {
    try {
        const { cafeId } = req.params;
        const cafe = await getSingleCafeService(cafeId);
        if (!cafe) {
            return res.status(404).send("Cafe not found");
        }
        res.status(200).json(cafe);
    } catch (error) {
        res.status(400).send("Failed to fetch cafe");
        console.error("Failed to fetch cafe", error);
    }
}