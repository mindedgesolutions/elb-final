import { Router } from "express";
const router = Router();
import {
  protectRoute,
  validateLogin,
  validateRegister,
} from "../middleware/authMiddleware.js";
import {
  checkLoginStatus,
  currentUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";

router.post(`/login`, validateLogin, login);
router.get(`/current-user`, protectRoute, currentUser);
router.post(`/logout`, logout);
router.get(`/login-status`, checkLoginStatus);
router.post(`/register`, validateRegister, register);

export default router;
