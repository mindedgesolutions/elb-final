import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import pool from "../db.js";

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
