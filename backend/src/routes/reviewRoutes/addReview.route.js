import express from 'express';
import { addReviewController } from '../../controllers/review.controller.js';

const router = express.Router();

router.route('/:cafeId/add-review')
    .post(addReviewController);

export { router as addReviewRouter };