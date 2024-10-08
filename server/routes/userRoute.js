import { Router } from "express";
const router = Router();
import { validateAddUser } from "../middleware/usersMiddleware.js";
import {
  activateUser,
  addUser,
  deleteUser,
  editUser,
  listUsers,
} from "../controllers/admin/userController.js";
import {
  addUserPost,
  deletePostImage,
  editUserPost,
  getUserListPosts,
  getUserPostCount,
  updateUserPost,
  viewUserPost,
} from "../controllers/user/userPostController.js";
import upload from "../middleware/multerMiddleware.js";
import {
  validateUserDynamic,
  validateUserPostForm,
} from "../middleware/postMiddleware.js";

router.route(`/users`).post(validateAddUser, addUser).get(listUsers);
router
  .route(`/users/:id`)
  .patch(validateAddUser, editUser)
  .delete(validateAddUser, deleteUser);
router.patch(`/users/activate/:id`, validateAddUser, activateUser);
router.get(`/:userId/posts`, getUserListPosts);
router.get(`/post-count`, getUserPostCount);
router.post(
  `/posts/add`,
  upload.array("image"),
  [validateUserPostForm, validateUserDynamic],
  addUserPost
);
router.get(`/posts/view/:id`, viewUserPost);
router.get(`/posts/edit/:id`, editUserPost);
router.patch(
  `/posts/update/:id`,
  upload.array("image"),
  [validateUserPostForm, validateUserDynamic],
  updateUserPost
);
router.delete(`/posts/image/:id`, deletePostImage);

export default router;
