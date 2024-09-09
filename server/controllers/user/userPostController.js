import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { getUserIdFromToken, paginationLogic } from "../../utils/functions.js";
import dayjs from "dayjs";

// ------
export const addPostReview = async (req, res) => {
  const { rating, review } = req.body;
  const { id } = req.params;
  const userId = await getUserIdFromToken(req);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const message = review ? review : null;

  const data = await pool.query(
    `insert into elb_reviews(post_id, review_by, rating, message, created_at, updated_at) values($1, $2, $3, $4, $5, $6)`,
    [id, userId, rating, message, timeStamp, timeStamp]
  );

  res.status(StatusCodes.CREATED).json(`success`);
};
