import { Router } from "express";
const router = Router();
import { validateAddUser } from "../middleware/usersMiddleware.js";
import {
  activateUser,
  addUser,
  deleteUser,
  editUser,
  listUsers,
} from "../controllers/userController.js";

router.route(`/users`).post(validateAddUser, addUser).get(listUsers);
router.route(`/users/:id`).patch(validateAddUser, editUser).delete(deleteUser);
router.patch(`/users/activate/:id`, activateUser);

export default router;
