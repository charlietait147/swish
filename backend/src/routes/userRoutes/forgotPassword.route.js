import express from "express";
import { forgotPasswordController } from '../../controllers/user.controller.js';

const router = express.Router();

router.route("/forgot-password")
    .post(forgotPasswordController);

export { router as forgotPasswordRouter };