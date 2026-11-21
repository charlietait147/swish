import express from "express";
import { googleAuthController } from "../../controllers/user.controller.js";

const router = express.Router();

router.route("/google")
    .post(googleAuthController);

export { router as googleAuthRouter };
