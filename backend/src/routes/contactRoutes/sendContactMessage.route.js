import express from "express";
import { sendContactMessageController } from "../../controllers/contact.controller.js";
import { contactValidation } from "../../middleware/contact.validation.js";

const router = express.Router();

router.route("/")
    .post(contactValidation, sendContactMessageController);

export { router as sendContactMessageRouter };
