import { Router } from "express";
const router = Router();
import { allCategories } from "../controllers/admin/categoryController.js";

router.get(`/categories`, allCategories);

export default router;
