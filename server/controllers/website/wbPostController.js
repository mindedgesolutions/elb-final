import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { wbPaginationLogic } from "../../utils/functions.js";

// ------
export const featuredProducts = async (req, res) => {
  let data = await pool.query(
    `select 
    pm.id, 
    pm.slug, 
    pm.title, 
    pm.price, 
    pm.updated_at,
    um.id as seller_id,
    um.first_name,
    um.last_name,
    json_agg(
      json_build_object(
        'path', pi.image_path,
        'cover', pi.is_cover,
        'active', pi.is_active
      )
      order by pi.id
    ) AS product_images,
    avg(er.rating) as seller_rating
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    left join elb_reviews er on er.seller_id = um.id
    left join elb_productimage pi on pi.product_id = pm.id
    where pm.is_feature=true and pm.is_active=true 
    group by pm.id, um.id
    order by pm.updated_at, pm.title`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const recentProducts = async (req, res) => {
  const data = await pool.query(
    `select
    pm.id, 
    pm.slug, 
    pm.title, 
    pm.price, 
    pm.updated_at,
    um.id as seller_id,
    um.first_name,
    um.last_name,
    json_agg(
      json_build_object(
        'path', pi.image_path,
        'cover', pi.is_cover,
        'active', pi.is_active
      )
      order by pi.id
    ) AS product_images,
    avg(er.rating) as seller_rating
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    left join elb_reviews er on er.seller_id = um.id
    left join elb_productimage pi on pi.product_id = pm.id
    where pm.is_active=true
    group by pm.id, um.id
    order by pm.updated_at desc limit 10`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const wbListPosts = async (req, res) => {
  const {
    page,
    cat,
    scat,
    loc,
    s: search,
    min: minPrice,
    max: maxPrice,
    sort,
  } = req.query;
  const pagination = wbPaginationLogic(page, null);

  let catId = "",
    subcatId = "";

  if (cat) {
    const category = await pool.query(
      `select id from master_categories where slug=$1`,
      [cat]
    );
    catId = category.rows[0].id;
  }

  if (scat) {
    const subCategory = await pool.query(
      `select id from master_categories where slug=$1`,
      [scat]
    );
    subcatId = subCategory.rows[0].id;
  }

  let searchStr = "";

  searchStr += catId ? searchStr + ` and pm.cat_id=${catId}` : searchStr;

  searchStr += subcatId
    ? searchStr + ` and pm.subcat_id=${subcatId}`
    : searchStr;

  searchStr += loc ? searchStr + ` and pm.city ilike '%${loc}%'` : searchStr;

  searchStr += search
    ? searchStr + ` and pm.title ilike '%${search}%'`
    : searchStr;

  searchStr = maxPrice
    ? searchStr + ` and pm.price <= ${Number(maxPrice)}`
    : searchStr;
  searchStr = minPrice
    ? searchStr + ` and pm.price >= ${Number(minPrice)}`
    : searchStr;

  let orderStr = "";
  if (sort) {
    if (sort === "1-2") {
      orderStr = `pm.price asc,`;
    } else if (sort === "2-1") {
      orderStr = `pm.price desc,`;
    } else if (sort === "a-b") {
      orderStr = `pm.title asc,`;
    } else {
      orderStr = `pm.title desc,`;
    }
  } else {
    orderStr = `pm.title asc,`;
  }

  const data = await pool.query(
    `select pm.id,
    pm.title,
    pm.slug,
    pm.price,
    pm.is_feature,
    pm.is_sold,
    pm.is_active,
    pm.created_at,
    pm.updated_at,
    um.id as user_id,
    um.first_name,
    um.last_name,
    avg(er.rating) as seller_rating,
    json_agg(
      json_build_object(
        'path', pi.image_path,
        'cover', pi.is_cover,
        'active', pi.is_active
      )
      order by pi.id
    ) AS product_images,
    cat.category as cat,
    scat.category as subcat
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    left join elb_reviews er on er.seller_id = um.id
    join master_categories cat on cat.id = pm.cat_id
    join master_categories scat on scat.id = pm.subcat_id
    left join elb_productimage pi on pi.product_id = pm.id
    where pm.id is not null ${searchStr} group by pm.id, um.id, cat.category, scat.category order by ${orderStr} um.first_name, um.last_name asc offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select pm.* from elb_product pm join elb_users um on pm.user_id = um.id where pm.id is not null ${searchStr}`,
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

// ------
export const wbSinglePost = async (req, res) => {
  const { slug } = req.params;

  const master = await pool.query(
    `select pm.*,
    pm.slug as productSlug,
    cat.category as cat,
    scat.category as subcat,
    um.id as seller_id,
    um.first_name,
    um.last_name,
    um.email,
    um.mobile,
    um.slug,
    json_agg(
      json_build_object(
        'id', pr.id,
        'review_by', pr.review_by,
        'rating', pr.rating,
        'message', pr.message,
        'updated_at', pr.updated_at,
        'is_publish', pr.is_publish,
        'is_active', pr.is_active
      )
    ) AS product_reviews
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    join master_categories cat on cat.id = pm.cat_id
    join master_categories scat on scat.id = pm.subcat_id
    left join elb_reviews pr on pr.post_id = pm.id
    where pm.slug=$1 group by pm.id, um.id, cat.category, scat.category, um.first_name, um.last_name, um.email, um.mobile, um.slug`,
    [slug]
  );

  const productDetails = await pool.query(
    `select pd.* from elb_product_details pd where product_id=$1`,
    [master.rows[0].id]
  );

  let details = [];
  for (const row of productDetails.rows) {
    const label = await pool.query(
      `select field_label from elb_form_attributes where id=$1`,
      [row.attr_id]
    );

    let value = "";
    if (row.attr_db_value) {
      const dbValue = await pool.query(
        `select option_value from elb_formfield_options where id=$1`,
        [row.attr_db_value]
      );
      value = dbValue.rows[0].option_value;
    } else {
      value = row.attr_entry;
    }

    const obj = { label: label.rows[0].field_label, value: value };
    details.push(obj);
  }

  const images = await pool.query(
    `select * from elb_productimage where product_id=$1`,
    [master.rows[0].id]
  );

  res.status(StatusCodes.OK).json({ master, details, images });
};

// ------
export const wbSellerReviewsLtd = async (req, res) => {
  const { slug } = req.params;

  const user = await pool.query(`select id from elb_users where slug=$1`, [
    slug,
  ]);

  const data = await pool.query(
    `select
    er.*,
    um.first_name,
    um.last_name
    from elb_reviews er
    join elb_users um on er.review_by = um.id 
    join elb_product pm on pm.id = er.post_id
    where pm.user_id=$1 and er.is_publish=2 and er.is_active=true 
    order by er.updated_at desc limit 6`,
    [user.rows[0].id]
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const wbSellerReviewsAll = async (req, res) => {
  const { page } = req.query;
  const { slug } = req.params;
  const pagination = wbPaginationLogic(page, null, 10);

  const user = await pool.query(`select id from elb_users where slug=$1`, [
    slug,
  ]);

  const data = await pool.query(
    `select
    er.*,
    um.first_name,
    um.last_name
    from elb_reviews er
    join elb_users um on er.review_by = um.id 
    join elb_product pm on pm.id = er.post_id
    where pm.user_id=$1 and er.is_publish=2 and er.is_active=true 
    order by er.updated_at desc offset $2 limit $3`,
    [user.rows[0].id, pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select er.* from elb_reviews er join elb_product pm on pm.id = er.post_id where pm.user_id=$1`,
    [user.rows[0].id]
  );
  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};

// ------
// seller_id is added in later stage... thus everything is channelled through products
export const wbSellerRating = async (req, res) => {
  const { slug } = req.params;

  const user = await pool.query(`select id from elb_users where slug=$1`, [
    slug,
  ]);

  const total = await pool.query(
    `select count(er.id) as count 
    from elb_reviews er
    join elb_product pm on pm.id = er.post_id
    where pm.user_id=$1 and er.is_publish=2 and er.is_active=true`,
    [user.rows[0].id]
  );
  const arr = [1, 2, 3, 4, 5];
  let count = [];
  for (const star of arr) {
    const getCount = await pool.query(
      `select count(er.id) as count 
      from elb_reviews er 
      join elb_product pm on pm.id = er.post_id
      where pm.user_id=$1 and er.is_publish=2 and er.is_active=true and er.rating=$2`,
      [user.rows[0].id, star]
    );
    count = [...count, getCount.rows[0].count];
  }
  const data = [...count, total.rows[0].count];

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const wbSellerProductsAll = async (req, res) => {
  const { page } = req.query;
  const { slug } = req.params;
  const pagination = wbPaginationLogic(page, null, 12);

  const user = await pool.query(`select id from elb_users where slug=$1`, [
    slug,
  ]);

  const data = await pool.query(
    `select
    pm.title,
    pm.price,
    pm.slug,
    pm.id,
    um.first_name,
    um.last_name,
    avg(er.rating) as seller_rating
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    left join elb_reviews er on er.seller_id = um.id
    where pm.user_id=$1 and pm.is_active=true
    group by pm.title, pm.id, um.first_name, um.last_name
    order by pm.updated_at desc offset $2 limit $3`,
    [user.rows[0].id, pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select pm.* from elb_product pm where pm.user_id=$1 and pm.is_active=true`,
    [user.rows[0].id]
  );
  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};
