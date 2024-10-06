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
import { getUserListPosts } from "../controllers/user/userPostController.js";

router.route(`/users`).post(validateAddUser, addUser).get(listUsers);
router
  .route(`/users/:id`)
  .patch(validateAddUser, editUser)
  .delete(validateAddUser, deleteUser);
router.patch(`/users/activate/:id`, validateAddUser, activateUser);
router.get(`/:userId/posts`, getUserListPosts);

export default router;
