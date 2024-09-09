import { Router } from "express";
const router = Router();
import { allCategories } from "../controllers/admin/categoryController.js";
import {
  featuredProducts,
  wbListPosts,
  recentProducts,
  wbSinglePost,
  wbPostReviews,
} from "../controllers/website/wbPostController.js";

router.get(`/categories`, allCategories);
router.get(`/featured-products`, featuredProducts);
router.get(`/recent-products`, recentProducts);
router.get(`/posts`, wbListPosts);
router.get(`/posts/:slug`, wbSinglePost);
router.get(`/posts/reviews/:slug`, wbPostReviews);

export default router;
