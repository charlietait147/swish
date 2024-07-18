import express from 'express';
import { getUserDataController } from '../../controllers/user.controller.js';

const router = express.Router();

router.route('/')
    .get(getUserDataController);

export { router as getUserDataRouter };