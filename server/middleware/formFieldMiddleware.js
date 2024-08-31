import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import { BadRequestError } from "../errors/customErrors.js";
import pool from "../db.js";

export const validateAddFormField = withValidationErrors([
  body("catId")
    .notEmpty()
    .withMessage(`Select a category`)
    .bail()
    .custom(async (value) => {
      const check = await pool.query(
        `select count(*) from master_categories where id=$1`,
        [Number(value)]
      );
      if (check.rowCount === 0) {
        throw new BadRequestError(`Invalid category`);
      }
      return true;
    }),
  body("subcatId")
    .notEmpty()
    .withMessage(`Select sub-category`)
    .custom(async (value) => {
      const check = await pool.query(
        `select count(*) from master_categories where id=$1`,
        [Number(value)]
      );
      if (check.rowCount === 0) {
        throw new BadRequestError(`Invalid sub-category`);
      }
      return true;
    }),
  body("formLabel")
    .notEmpty()
    .withMessage(`Form field label is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Label must be between 3 to 255 characters`),
  body("fieldType")
    .notEmpty()
    .withMessage(`Form field type is required`)
    .bail()
    .custom((value) => {
      const arr = ["text", "textarea", "checkbox", "radio", "number"];
      const check = arr.includes(value);
      if (!check) {
        throw new BadRequestError(`Invalid field type`);
      }
      return true;
    }),
  body("options").custom(async (value, { req }) => {
    const { fieldType } = req.body;
    if (fieldType === "radio" && value.length === 0) {
      throw new BadRequestError(`At least one option is required`);
    }
    return true;
  }),
]);
