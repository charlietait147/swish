import express from 'express';
import { deleteReviewController } from '../../controllers/review.controller.js';

const router = express.Router();

router.route('/delete-review/:reviewId')
    .delete(deleteReviewController);

export { router as deleteReviewRouter };