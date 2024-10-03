import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";
import { BadRequestError } from "../errors/customErrors.js";
import { createJWT, verifyJWT } from "../utils/tokenUtils.js";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { generateSlug } from "../utils/functions.js";

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
    `select * from elb_users where email=$1 and is_active=true`,
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
    `select id, first_name, last_name, rid, is_active, slug from elb_users where uuid=$1`,
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

// ------
export const checkLoginStatus = async (req, res) => {
  const { token_elb } = req.cookies;
  let status = true;
  if (token_elb) {
    const { uuid } = verifyJWT(token_elb);
    status = uuid ? true : false;
  } else {
    status = false;
  }
  res.status(StatusCodes.OK).json({ status });
};

// ------
export const register = async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;
  const createdAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const userUuid = uuidv4();
  const userPass = await hashPassword(password);
  const userSlug = await generateSlug(firstName.trim(), lastName.trim());
  const roleId = 2;

  const data = await pool.query(
    `insert into elb_users(first_name, last_name, email, mobile, password, created_at, updated_at, uuid, slug, rid) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
    [
      firstName.trim(),
      lastName.trim(),
      email,
      mobile,
      userPass,
      createdAt,
      updatedAt,
      userUuid,
      userSlug,
      roleId,
    ]
  );

  res.status(StatusCodes.CREATED).json({ data });
};
