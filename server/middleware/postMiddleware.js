import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";

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
