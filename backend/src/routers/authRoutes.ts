import authController from "../controllers/authControllers.js";
import express from 'express'

const router = express.Router();

//GET: Render login page & POST: Verify login credentials
router.route("/")
.get(authController.renderLogin)
.post(authController.verifyLogin);

//GET: Render sighup page & POST: Create new user
router.route("/signup")
.get(authController.renderSignup)
.post(authController.createUser);

export default router;