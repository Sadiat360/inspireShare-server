import authorise from "../middleware/auth.js";
import express from 'express';
import * as usersControllers from '../controllers/users-controllers.js'

const router = express.Router();

router.route('/').get(usersControllers.server)
router.route('/register').post(usersControllers.registerUser)
router.route('/login').post(usersControllers.loginUser)
router.route('/logOut').post(authorise,usersControllers.logOutUser)
router.route('/profile').get(authorise,usersControllers.getProfile)



export default router;