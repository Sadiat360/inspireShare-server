import express from 'express';
import * as faqQuestionControllers from '../controllers/faqQuestion-controllers.js'

const router = express.Router()

router.route('/').get(faqQuestionControllers.server);

export default router;