import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import dayjs from "dayjs";
import slug from "slug";
import { BadRequestError } from "../../errors/customErrors.js";

// ------
export const featuredProducts = async (req, res) => {
  const data = await pool.query(
    `select title, price from elb_product where is_feature=true and is_active=true order by updated_at, title`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const recentProducts = async (req, res) => {
  const data = await pool.query(
    `select id, slug, title, price from elb_product where is_active=true order by updated_at desc limit 10`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};
