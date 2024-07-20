import express from 'express';
import { deleteSavedCafeController } from '../../controllers/user.controller.js';

const router = express.Router();

router.route('/:cafeId')
    .delete(deleteSavedCafeController);

export { router as deleteSavedCafeRouter };
