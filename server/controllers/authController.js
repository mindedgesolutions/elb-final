import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import { checkPassword } from "../utils/passwordUtils.js";
import { BadRequestError } from "../errors/customErrors.js";
import { createJWT, verifyJWT } from "../utils/tokenUtils.js";

// ------
export const login = async (req, res) => {
  const { username, password, remember } = req.body;

  const checkUsername = await pool.query(
    `select count(*) from elb_users where email=$1 and is_active=true`,
    [username]
  );
  if (Number(checkUsername.rows[0].count) === 0)
    throw new BadRequestError(`Incorrect username`);

  const user = await pool.query(
    `select * from elb_users where email=$1 and is_active=true and rid=1`,
    [username]
  );

  if (Number(user.rowCount) === 0) {
    throw new BadRequestError(`You're not an admin`);
  }

  const checkPass = await checkPassword(password, user.rows[0].password);

  if (!checkPass) throw new BadRequestError(`Incorrect password`);

  const payload = {
    uuid: user.rows[0].uuid,
  };
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  const token = createJWT(payload, remember);

  const expiryDate = remember
    ? new Date(Date.now() + oneMonth)
    : new Date(Date.now() + oneDay);

  res.cookie("token_elb", token, {
    httpOnly: true,
    expires: expiryDate,
    secure: process.env.APP_ENV === "production",
  });

  res.status(StatusCodes.ACCEPTED).json({ data: user.rows[0], token: token });
};

// ------
export const currentUser = async (req, res) => {
  const { token_elb } = req.cookies;
  const { uuid } = verifyJWT(token_elb);
  const data = await pool.query(
    `select id, first_name, last_name, rid, is_active from elb_users where uuid=$1`,
    [uuid]
  );
  return res.status(StatusCodes.OK).json({ data });
};

// ------
export const logout = async (req, res) => {
  res.cookie("token_elb", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.NO_CONTENT).json({ msg: "User logged out" });
};
