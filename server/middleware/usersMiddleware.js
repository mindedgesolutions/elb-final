import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";
import { isMobileNumber } from "../utils/formatValidation.js";

export const validateAddUser = withValidationErrors([
  body("firstName").notEmpty().withMessage(`First name is required`).bail(),
  body("lastName").notEmpty().withMessage(`Last name is required`).bail(),
  body("email")
    .notEmpty()
    .withMessage(`Email is required`)
    .bail()
    .isEmail()
    .withMessage(`Enter a valid email address`)
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const query = id ? `email=$1 and id!=$2` : `email=$1`;
      const params = id ? [value, id] : [value];

      const check = await pool.query(
        `select count(*) from elb_users where ${query}`,
        params
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Email exists`);
      }
      return true;
    }),
  body("mobile")
    .notEmpty()
    .withMessage(`Mobile no. is required`)
    .bail()
    .custom(isMobileNumber)
    .withMessage(`Invalid mobile no.`)
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const query = id ? `mobile=$1 and id!=$2` : `mobile=$1`;
      const params = id ? [value, id] : [value];

      const check = await pool.query(
        `select count(*) from elb_users where ${query}`,
        params
      );
      if (Number(check.rows[0].count) > 0) {
        throw new BadRequestError(`Mobile no. exists`);
      }
      return true;
    }),
]);
