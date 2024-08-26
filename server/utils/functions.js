import slug from "slug";
import pool from "../db.js";
import { verifyJWT } from "./tokenUtils.js";

export const getUserId = async (uuid) => {
  const user = await pool.query(`select id from master_users where uuid=$1`, [
    uuid,
  ]);
  return user.rows[0].id;
};

export const getUserIdFromToken = async (req) => {
  const { token } = req.cookies;
  const useUuid = verifyJWT(token);
  const userId = await getUserId(useUuid.uuid);
  return userId;
};

export const paginationLogic = (page, limit) => {
  const pageLimit = limit || process.env.ITEMS_PER_PAGE;
  const pageNo = Number(page) || 1;
  const offset = (pageNo - 1) * Number(pageLimit);

  return { pageLimit, offset, pageNo };
};

export const generateSlug = async (firstName, lastName) => {
  let newSlug = slug(`${firstName} ${lastName}`);
  const checkCount = await pool.query(
    `select count(*) from elb_users where slug=$1`,
    [newSlug]
  );
  const userSlug =
    Number(checkCount.rows[0].count) > 0
      ? newSlug + "-" + (Number(checkCount.rows[0].count) + 1)
      : newSlug;

  return userSlug;
};

export const generateOtherSlug = async (table, value) => {
  let newSlug = slug(value);
  const check = await pool.query(
    `select count(*) from ${table} where slug=$1`,
    [newSlug]
  );
  const uniqueSlug =
    Number(check.rows[0].count) > 0
      ? newSlug + "-" + (Number(check.rows[0].count) + 1)
      : newSlug;

  return uniqueSlug;
};

export const removeSpecialChars = (str) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
};

export const rtrim = (str) => {
  return str.replace(/,+$/, "");
};
