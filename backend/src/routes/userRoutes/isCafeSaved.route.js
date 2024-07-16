import express from 'express';
import { isCafeSavedController } from '../../controllers/user.controller.js';

const router = express.Router();

router.route('/isCafeSaved/:cafeId')
    .get(isCafeSavedController);

export { router as isCafeSavedRouter };