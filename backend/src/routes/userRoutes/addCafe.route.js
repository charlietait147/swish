import express from "express";
import { addCafeController } from "../../controllers/user.controller.js";

const router = express.Router();

router.route("/add-cafe/:cafeId")
    .post(addCafeController);

export { router as addCafeRouter };
