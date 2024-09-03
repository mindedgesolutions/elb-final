import { Router } from "express";
const router = Router();
import { allCategories } from "../controllers/admin/categoryController.js";
import { featuredProducts } from "../controllers/website/wbPostController.js";

router.get(`/categories`, allCategories);
router.get(`/featured-products`, featuredProducts);

export default router;
