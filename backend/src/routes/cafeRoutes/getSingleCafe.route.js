import express from 'express';
import { getSingleCafeController } from '../../controllers/cafe.controller.js';

const router = express.Router();

router.route('/:cafeId')
    .get(getSingleCafeController);

export { router as getSingleCafeRouter };