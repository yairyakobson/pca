import express from "express";
const router = express.Router();

import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { getCurrentUser } from "../controllers/currentUser.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getCurrentUser);

export default router;