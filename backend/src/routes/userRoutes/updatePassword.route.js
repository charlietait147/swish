import express from "express";
import { updatePasswordController } from "../../controllers/user.controller.js";
import { updatePasswordValidation } from "../../middleware/user.validation.js";

const router = express.Router();

router.route("/update-password/")
    .put(updatePasswordValidation, updatePasswordController);

export { router as updatePasswordRouter };

