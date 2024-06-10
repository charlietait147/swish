import express from 'express';
import { editReviewController } from '../../controllers/review.controller.js';

const router = express.Router();

router.route('/edit-review/:reviewId')
    .put(editReviewController);

export { router as editReviewRouter };