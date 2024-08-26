import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";
import { generateOtherSlug } from "../utils/functions.js";
import slug from "slug";

export const validateAddCategory = withValidationErrors([
  body("parentId").custom(async (value, { req }) => {
    const { isParent } = req.body;
    if (!isParent && !value) {
      throw new BadRequestError(`Select parent category`);
    }
    if (value) {
      const check = await pool.query(
        `select count(*) from master_categories where id=$1`,
        [Number(value)]
      );
      if (Number(check.rows[0].count) === 0) {
        throw new BadRequestError(`Invalid parent category`);
      }
    }
    return true;
  }),
  body("category")
    .notEmpty()
    .withMessage(`Category name is required`)
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const catSlug = slug(value);
      const query = id ? `slug=$1 and id!=$2` : `slug=$1`;
      const values = id ? [catSlug, id] : [catSlug];
      const check = await pool.query(
        `select count(*) from master_categories where ${query}`,
        values
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Category exists`);
      }
      return true;
    }),
]);
