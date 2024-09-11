import { Router } from "express";
const router = Router();
import { allCategories } from "../controllers/admin/categoryController.js";
import {
  featuredProducts,
  wbListPosts,
  recentProducts,
  wbSinglePost,
  wbSellerReviewsLtd,
  wbSellerReviewsAll,
  wbSellerRating,
  wbSellerProductsAll,
} from "../controllers/website/wbPostController.js";

router.get(`/categories`, allCategories);
router.get(`/featured-products`, featuredProducts);
router.get(`/recent-products`, recentProducts);
router.get(`/posts`, wbListPosts);
router.get(`/posts/:slug`, wbSinglePost);
router.get(`/posts/reviewsLtd/:slug`, wbSellerReviewsLtd);
router.get(`/posts/reviewsAll/:slug`, wbSellerReviewsAll);
router.get(`/posts/rating/:slug`, wbSellerRating);
router.get(`/posts/sellerProducts/:slug`, wbSellerProductsAll);

export default router;
