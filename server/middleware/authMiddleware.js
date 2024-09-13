import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import pool from "../db.js";
import { isMobileNumber } from "../utils/formatValidation.js";

// ------
export const validateLogin = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage(`Username is required`)
    .bail()
    .isEmail()
    .withMessage(`Not a valid email address`),
  body("password").notEmpty().withMessage(`Password is required`),
]);

// ------
export const protectRoute = async (req, res, next) => {
  const { token_elb } = req.cookies;
  if (!token_elb) {
    throw new UnauthenticatedError(`Login required`);
  }
  try {
    const { uuid } = verifyJWT(token_elb);
    const check = await pool.query(
      `select count(*) from elb_users where uuid=$1 and is_active=true and rid=1`,
      [uuid]
    );
    if (check.rowCount === 0) {
      throw new UnauthenticatedError(`Login required`);
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError(`User does not exist! Login required`);
  }
};

// ------
export const validateRegister = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage(`First name is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`First name must be between 3 to 255 characters`),
  body("lastName")
    .notEmpty()
    .withMessage(`Last name is required`)
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage(`Last name must be between 3 to 255 characters`),
  body("email")
    .notEmpty()
    .withMessage(`Email is required`)
    .bail()
    .isEmail()
    .withMessage(`Invalid email address`)
    .bail()
    .custom(async (value, { req }) => {
      const data = await pool.query(
        `select count(id) from elb_users where email=$1`,
        [value]
      );
      if (data.rows[0].count > 0) throw new BadRequestError(`Email exists`);
      return true;
    }),
  body("mobile")
    .notEmpty()
    .withMessage(`Mobile no. is required`)
    .bail()
    .isNumeric()
    .withMessage(`Mobile no. must be a number`)
    .bail()
    .custom(isMobileNumber)
    .withMessage(`Invalid mobile no.`)
    .bail()
    .custom(async (value) => {
      const data = await pool.query(
        `select count(id) from elb_users where mobile=$1`,
        [value]
      );
      if (data.rows[0].count > 0)
        throw new BadRequestError(`Mobile no. exists`);
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage(`Password is required`)
    .bail()
    .isLength({ min: 6, max: 15 })
    .withMessage(`Password must be between 6 to 15 characters`),
]);
