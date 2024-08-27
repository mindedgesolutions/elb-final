import { Router } from "express";
const router = Router();
import {
  activateCategory,
  addCategory,
  deleteCategory,
  editCategory,
  listCategories,
  parentCategories,
} from "../controllers/admin/categoryController.js";
import { validateAddCategory } from "../middleware/categoryMiddleware.js";

router
  .route(`/categories`)
  .post(validateAddCategory, addCategory)
  .get(listCategories);
router
  .route(`/categories/:id`)
  .patch(validateAddCategory, editCategory)
  .delete(deleteCategory);

router.get(`/parent-categories`, parentCategories);
router.patch(`/categories/activate/:id`, activateCategory);

export default router;
