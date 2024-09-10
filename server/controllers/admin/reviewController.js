import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { paginationLogic, removeSpecialChars } from "../../utils/functions.js";
import dayjs from "dayjs";
import slug from "slug";
import { BadRequestError } from "../../errors/customErrors.js";

// ------
export const adminReviews = async (req, res) => {
  const { page, search, type } = req.query;
  const pagination = paginationLogic(page, null);

  const data = await pool.query(
    `select
    er.*,
    um.first_name,
    um.last_name,
    pm.title
    from elb_reviews er
    join elb_users um on er.review_by = um.id
    join elb_product pm on pm.id = er.post_id`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const togglePublishReview = async (req, res) => {};

// ------
export const rejectReview = async (req, res) => {};
