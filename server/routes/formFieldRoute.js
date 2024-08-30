import { Router } from "express";
const router = Router();
import {
  addFormField,
  listFormFields,
} from "../controllers/admin/formFieldController.js";
import { validateAddFormField } from "../middleware/formFieldMiddleware.js";

router
  .route(`/form-fields`)
  .post(validateAddFormField, addFormField)
  .get(listFormFields);

export default router;
