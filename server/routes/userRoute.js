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
  getUserListPosts,
  getUserPostCount,
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

export default router;
