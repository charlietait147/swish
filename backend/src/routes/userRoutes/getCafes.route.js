import express from 'express';
import { getCafesController } from '../../controllers/user.controller.js';

const router = express.Router();

router.route('/cafes')
    .get(getCafesController);

export { router as getCafesRouter };
