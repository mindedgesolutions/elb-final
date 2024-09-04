import { Router } from "express";
const router = Router();
import { allCategories } from "../controllers/admin/categoryController.js";
import {
  featuredProducts,
  recentProducts,
} from "../controllers/website/wbPostController.js";

router.get(`/categories`, allCategories);
router.get(`/featured-products`, featuredProducts);
router.get(`/recent-products`, recentProducts);

export default router;
