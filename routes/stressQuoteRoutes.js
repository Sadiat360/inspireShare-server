import express from 'express';
import * as stressQuotesController from '../controllers/stressQuotes-controllers.js'

const router = express.Router()

router.route('/').get(stressQuotesController.server)
router.route('/stressQuote').get(stressQuotesController.findRandomstressQuote)

export default router;