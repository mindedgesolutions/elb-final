import { Router } from "express";
const router = Router();
import {
  addPost,
  adminListPost,
  deletePost,
  getSinglePost,
  toggleFeatured,
  toggleSold,
  updatePost,
} from "../controllers/postController.js";
import {
  validateAddPost,
  validateAddReview,
} from "../middleware/postMiddleware.js";
import { addPostReview } from "../controllers/user/userPostController.js";
import { getSellerProfile } from "../controllers/user/profileController.js";

router.route(`/admin`).post(validateAddPost, addPost).get(adminListPost);
router
  .route(`/admin/:id`)
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

router.patch(`/toggle-featured/:id`, toggleFeatured);
router.patch(`/toggle-sold/:id`, toggleSold);
router.post(`/add-review/:id`, validateAddReview, addPostReview);
router.get(`/seller-profile/:slug`, getSellerProfile);

export default router;
