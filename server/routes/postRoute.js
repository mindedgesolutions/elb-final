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
import { validateAddPost } from "../middleware/postMiddleware.js";

router.route(`/admin`).post(validateAddPost, addPost).get(adminListPost);
router
  .route(`/admin/:id`)
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

router.patch(`/toggle-featured/:id`, toggleFeatured);
router.patch(`/toggle-sold/:id`, toggleSold);

export default router;
