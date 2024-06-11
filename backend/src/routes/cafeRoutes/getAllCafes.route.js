import express from 'express';
import { getAllCafesController } from '../../controllers/cafe.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllCafesController);

export { router as getAllCafesRouter };
