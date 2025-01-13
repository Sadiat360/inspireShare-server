import express from 'express';
import * as userStreakControllers from '../controllers/userStreak-controllers.js'

const router = express.Router()

router.route('/').get(userStreakControllers.server).get(userStreakControllers.findUserStreak).update(userStreakControllers.updateUserStreak)
// router.route('/stressQuote').get(loveQuotesController.findRandomloveQuote)

export default router;