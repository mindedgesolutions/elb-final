import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import dayjs from "dayjs";
import slug from "slug";
import { BadRequestError } from "../../errors/customErrors.js";
import { wbPaginationLogic } from "../../utils/functions.js";

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

// ------
export const wbListPosts = async (req, res) => {
  const { page } = req.query;
  const pagination = wbPaginationLogic(page, null);

  const data = await pool.query(
    `select pm.id,
    pm.title,
    pm.slug,
    pm.price,
    pm.is_feature,
    pm.is_sold,
    pm.is_active,
    pm.created_at,
    um.id as user_id,
    um.first_name,
    um.last_name,
    cat.category as cat,
    scat.category as subcat
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    join master_categories cat on cat.id = pm.cat_id
    join master_categories scat on scat.id = pm.subcat_id
    where pm.id is not null order by pm.title, um.first_name, um.last_name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select pm.* from elb_product pm join elb_users um on pm.user_id = um.id where pm.id is not null`,
    []
  );
  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};
