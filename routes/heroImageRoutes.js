import express from 'express';
import * as heroImageControllers from '../controllers/heroImage-controllers.js'

const router = express.Router()

router.route('/').get(heroImageControllers.server);


export default router;