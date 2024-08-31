import { Router } from "express";
const router = Router();
import {
  addFormField,
  deleteFormField,
  getFormFieldDetails,
  listFormFields,
  updateFormField,
} from "../controllers/admin/formFieldController.js";
import { validateAddFormField } from "../middleware/formFieldMiddleware.js";

router
  .route(`/form-fields`)
  .post(validateAddFormField, addFormField)
  .get(listFormFields);
router
  .route(`/form-fields/:id`)
  .get(getFormFieldDetails)
  .put(validateAddFormField, updateFormField)
  .delete(deleteFormField);

export default router;
