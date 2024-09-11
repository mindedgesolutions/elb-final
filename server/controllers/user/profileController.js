import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";

// ------
export const getSellerProfile = async (req, res) => {
  const { slug } = req.params;

  const seller = await pool.query(`select id from elb_users where slug=$1`, [
    slug,
  ]);

  const data = await pool.query(
    `select um.*, um.created_at as um_created_at, um.updated_at as um_updated_at, up.* from elb_users um left join elb_profile up on up.uid = um.id where um.id=$1`,
    [seller.rows[0].id]
  );

  const products = await pool.query(
    `select slug, title, price from elb_product where user_id=$1 order by updated_at desc limit 8`,
    [seller.rows[0].id]
  );

  const totalPosts = await pool.query(
    `select count(id) from elb_product where user_id=$1 and is_active=true`,
    [seller.rows[0].id]
  );

  const reviews = await pool.query(
    `select pr.*, um.first_name, um.last_name from elb_reviews pr 
    join elb_product pm on pr.post_id = pm.id 
    join elb_users um on pr.review_by = um.id 
    where pm.user_id = $1 order by pr.updated_at desc limit 6`,
    [seller.rows[0].id]
  );

  res
    .status(StatusCodes.OK)
    .json({ data, products, reviews, totalPosts: totalPosts.rows[0].count });
};
