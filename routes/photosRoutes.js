import express from 'express';
import * as photosController from '../controllers/photos-controllers.js'

const router = express.Router()

router.route('/').get(photosController.server)
router.route('/photos/:photoId').get(photosController.findPhoto)

export default router;