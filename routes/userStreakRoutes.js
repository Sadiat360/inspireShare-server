import express from 'express';
import authorise from '../middleware/auth.js';
import * as userStreakControllers from '../controllers/userStreak-controllers.js'

const router = express.Router()

router.route('/').get(userStreakControllers.server)
router.route('/:userId').get(userStreakControllers.findUserStreak) 
router.route('/update').post(authorise,userStreakControllers.updateUserStreak)


export default router;