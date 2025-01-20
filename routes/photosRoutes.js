import express from 'express';
import * as photosController from '../controllers/photos-controllers.js'

const router = express.Router()

router.route('/').get(photosController.server)
router.route('/:photoId').get(photosController.findPhoto)

export default router;