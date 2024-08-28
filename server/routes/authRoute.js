import { Router } from "express";
const router = Router();
import { protectRoute, validateLogin } from "../middleware/authMiddleware.js";
import { currentUser, login } from "../controllers/authController.js";

router.post(`/login`, validateLogin, login);
router.get(`/current-user`, protectRoute, currentUser);

export default router;
