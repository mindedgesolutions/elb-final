import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";

// ------
export const getSellerProfile = async (req, res) => {
  const { slug } = req.params;

  const getId = await pool.query(`select id from elb_users where slug=$1`, [
    slug,
  ]);

  const data = await pool.query(
    `select um.* from elb_users um where um.id=$1`,
    [getId.rows[0].id]
  );

  const products = await pool.query(
    `select slug, title, price from elb_product where user_id=$1 order by updated_at desc limit 10`,
    [getId.rows[0].id]
  );

  const reviews = await pool.query(
    `select pr.* from elb_reviews pr join elb_product pm on pr.post_id = pm.id where pm.user_id = $1 order by pr.updated_at desc`,
    [getId.rows[0].id]
  );

  res.status(StatusCodes.OK).json({ data, products, reviews });
};
