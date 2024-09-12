import { Router } from "express";
const router = Router();
import { protectRoute, validateLogin } from "../middleware/authMiddleware.js";
import {
  checkLoginStatus,
  currentUser,
  login,
  logout,
} from "../controllers/authController.js";

router.post(`/login`, validateLogin, login);
router.get(`/current-user`, protectRoute, currentUser);
router.post(`/logout`, logout);
router.get(`/login-status`, checkLoginStatus);

export default router;
