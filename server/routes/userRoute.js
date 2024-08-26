import { Router } from "express";
const router = Router();
import { validateAddUser } from "../middleware/usersMiddleware.js";
import { addUser, editUser, listUsers } from "../controllers/userController.js";

router.route(`/users`).post(validateAddUser, addUser).get(listUsers);
router.route(`/users/:id`).patch(validateAddUser, editUser);

export default router;
