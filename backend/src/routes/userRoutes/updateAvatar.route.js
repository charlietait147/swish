import express from "express";
import { updateAvatarController } from "../../controllers/user.controller.js";
import avatarUpload from "../../middleware/avatar.upload.js";

const router = express.Router();

router.route("/avatar")
    .put(avatarUpload, updateAvatarController);

export { router as updateAvatarRouter };
