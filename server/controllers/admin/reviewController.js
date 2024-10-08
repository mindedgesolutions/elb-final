import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { paginationLogic } from "../../utils/functions.js";

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
    join elb_product pm on pm.id = er.post_id order by er.created_at desc offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(`select er.* from elb_reviews er`, []);

  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};

// ------
export const togglePublishReview = async (req, res) => {
  const { type } = req.body;
  const { id } = req.params;

  await pool.query(`update elb_reviews set is_publish=$1 where id=$2`, [
    type,
    id,
  ]);

  res.status(StatusCodes.ACCEPTED).json(`success`);
};
