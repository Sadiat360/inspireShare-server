import express from 'express';
import * as loveQuotesController from '../controllers/loveQuotes-controllers.js'

const router = express.Router()

router.route('/').get(loveQuotesController.server)
router.route('/stressQuote').get(loveQuotesController.findRandomloveQuote)

export default router;