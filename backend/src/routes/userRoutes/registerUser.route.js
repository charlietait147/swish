import express from "express";
import { registerUserController } from "../../controllers/user.controller.js";
import { userRegisterValidation } from "../../middleware/user.validation.js";

const router = express.Router();

router.route("/register")
    .post(userRegisterValidation, registerUserController);

export { router as registerUserRouter };