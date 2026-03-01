import express from "express";
import { resetPasswordController } from "../../controllers/user.controller.js";
import { resetPasswordValidation } from "../../middleware/user.validation.js";

const router = express.Router();

router.route("/reset-password/:token")
    .post(resetPasswordValidation, resetPasswordController);

export { router as resetPasswordRouter };

