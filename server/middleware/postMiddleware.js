import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";
import { rtrim } from "../utils/functions.js";

export const validateAddPost = withValidationErrors([
  body("catId")
    .notEmpty()
    .withMessage(`Select a category`)
    .bail()
    .custom(async (value) => {
      const check = await pool.query(
        `select count(*) from master_categories where id=$1 and parent_id is null`,
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
    .bail()
    .custom(async (value, { req }) => {
      const { catId } = req.body;
      const check = await pool.query(
        `select count(*) from master_categories where id=$1 and parent_id=$2`,
        [Number(value), Number(catId)]
      );
      if (check.rowCount === 0) {
        throw new BadRequestError(`Invalid category`);
      }
      return true;
    }),
  body("title")
    .notEmpty()
    .withMessage(`Post title is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Post title must be between 3 to 255 characters`),
  body("description")
    .notEmpty()
    .withMessage(`Post description is required`)
    .bail()
    .isLength({ min: 3, max: 500 })
    .withMessage(`Post title must be between 3 to 500 characters`),
]);

export const validateAddReview = withValidationErrors([
  body("rating").custom((value) => {
    if (!value || value === 0) {
      throw new BadRequestError(`Rating is required`);
    }
    return true;
  }),
  body("review")
    .optional()
    .isLength({ max: 500 })
    .withMessage(`Review cannot be more than 500 characters`),
]);

// User post form validation start ------
export const validateUserPostForm = withValidationErrors([
  body("title")
    .notEmpty()
    .withMessage(`Title is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Title must be between 3 to 255 characters`),
  body("catId").notEmpty().withMessage(`Select a category`),
  body("subcatId").notEmpty().withMessage(`Select a sub-category`),
  body("pinCode")
    .notEmpty()
    .withMessage(`PIN code is required`)
    .bail()
    .isNumeric()
    .withMessage(`PIN code must be a number`)
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage(`PIN code must 6 digits`),
  body("city").notEmpty().withMessage(`City is required`),
  body("state").notEmpty().withMessage(`State is required`),
  body("price").notEmpty().withMessage(`Price is required`),
  body("description")
    .notEmpty()
    .withMessage(`Description is required`)
    .bail()
    .isLength({ min: 3, max: 500 })
    .withMessage(`Description must be between 3 to 500 characters`),
]);

export const validateUserDynamic = async (req, res, next) => {
  const { subcatId } = req.body;
  const data = await pool.query(
    `select field_name, field_label, is_required, field_type from elb_form_attributes where cat_id=$1 and is_active=true`,
    [subcatId]
  );

  let errorMessages = "";

  data.rows.forEach((field) => {
    const value = req.body[field.field_name];

    if (field.is_required && !value) {
      errorMessages += `${field.field_label} is required,`;
    }

    if (field.field_type === "number" && +value < 0) {
      errorMessages += `${field.field_label} cannot be negative,`;
    }
  });

  errorMessages = rtrim(errorMessages);
  if (errorMessages) {
    throw new BadRequestError(errorMessages);
  }

  next();
};
// User post form validation ends ------
