import express from 'express';
import * as categoryImgControllers from '../controllers/categoryImg-controllers.js';

const router = express.Router()

router.route('/').get(categoryImgControllers.server)

export default router;