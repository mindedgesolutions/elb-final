import { Router } from "express";
const router = Router();
import {
  addPost,
  adminListPost,
  getSinglePost,
  updatePost,
} from "../controllers/postController.js";
import { validateAddPost } from "../middleware/postMiddleware.js";

router.route(`/admin`).post(validateAddPost, addPost).get(adminListPost);
router.route(`/admin/:id`).get(getSinglePost).patch(updatePost);

export default router;
