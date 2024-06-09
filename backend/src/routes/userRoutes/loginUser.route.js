import express from "express";
import { loginUserController } from "../../controllers/user.controller.js";

const router = express.Router();

router.route("/login")
    .post(loginUserController);

export { router as loginUserRouter };