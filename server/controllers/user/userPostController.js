import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import {
  generateOtherSlug,
  getUserId,
  getUserIdFromToken,
  paginationLogic,
} from "../../utils/functions.js";
import dayjs from "dayjs";
import { verifyJWT } from "../../utils/tokenUtils.js";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs/promises";
import path from "path";

// ------
export const addPostReview = async (req, res) => {
  const { rating, review, sellerId } = req.body;
  const { id } = req.params;
  const userId = await getUserIdFromToken(req);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const message = review ? review : null;

  await pool.query(
    `insert into elb_reviews(post_id, review_by, rating, message, created_at, updated_at, seller_id) values($1, $2, $3, $4, $5, $6, $7)`,
    [id, userId, rating, message, timeStamp, timeStamp, sellerId]
  );

  res.status(StatusCodes.CREATED).json(`success`);
};

// ------
export const getUserListPosts = async (req, res) => {
  const { page, status } = req.query;
  const { userId } = req.params;
  const pagination = paginationLogic(page, null);

  let queryFilter;
  switch (status) {
    case `all`:
      queryFilter = ``;
      break;
    case `posted`:
      queryFilter = ` and pm.is_sold=false`;
      break;
    case `sold`:
      queryFilter = ` and pm.is_sold=true`;
      break;
    case `rejected`:
      queryFilter = ` and pm.is_blocked=true`;
      break;
    default:
      queryFilter = "";
      break;
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
    cat.category as cat,
    scat.category as subcat
    from elb_product pm
    join elb_users um on pm.user_id = um.id
    left join elb_reviews er on er.seller_id = um.id
    join master_categories cat on cat.id = pm.cat_id
    join master_categories scat on scat.id = pm.subcat_id
    where pm.id is not null and pm.user_id=$3 ${queryFilter} group by pm.id, um.id, cat.category, scat.category order by um.first_name, um.last_name asc offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit, userId]
  );

  const records = await pool.query(
    `select pm.* from elb_product pm join elb_users um on pm.user_id = um.id where pm.id is not null and pm.user_id=$1 ${queryFilter}`,
    [userId]
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
export const getUserPostCount = async (req, res) => {
  const userId = await getUserIdFromToken(req);

  const data = await pool.query(
    `select 
      count(id) as total_all,
      count(case when is_sold=false then 1 end) as total_posted,
      count(case when is_sold=true then 1 end) as total_sold,
      count(case when is_blocked=true then 1 end) as total_blocked
    from elb_product where is_active=true and user_id=$1`,
    [userId]
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const addUserPost = async (req, res) => {
  const obj = { ...req.body };
  const {
    catId,
    subcatId,
    title,
    description,
    pinCode,
    city,
    state,
    price,
    isNew,
    cover,
  } = obj;
  const { token_elb } = req.cookies;
  const { uuid } = verifyJWT(token_elb);
  const userId = await getUserId(uuid);
  const productDesc = description || null;
  const productSlug = await generateOtherSlug("elb_product", title);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  try {
    await pool.query(`BEGIN`);

    const master = await pool.query(
      `insert into elb_product(user_id, title, cat_id, subcat_id, description, price, pincode, city, state, is_new, slug, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning id`,
      [
        userId,
        title.trim(),
        catId,
        subcatId,
        productDesc,
        price,
        pinCode,
        city,
        state,
        isNew,
        productSlug,
        timeStamp,
        timeStamp,
      ]
    );

    const postId = master.rows[0].id;

    const formFields = await pool.query(
      `select id, field_name, field_type from elb_form_attributes where cat_id=$1`,
      [subcatId]
    );

    for (const field of formFields.rows) {
      const value = obj[field.field_name];

      const dbData = field.field_type === "radio" ? value : null;
      const entryData =
        field.field_type === "text" ||
        field.field_type === "textarea" ||
        field.field_type === "number"
          ? value
          : null;

      await pool.query(
        `insert into elb_product_details(product_id, attr_id, attr_db_value, attr_entry)
        VALUES($1, $2, $3, $4)`,
        [postId, +field.id, dbData, entryData]
      );
    }

    const postDirectory = path.join("public", "uploads", "posts", `${postId}`);
    await fs.mkdir(postDirectory, { recursive: true });
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Ensure file.buffer is valid
        if (!file.buffer) {
          console.log("File buffer is missing");
          continue;
        }

        const type = await fileTypeFromBuffer(file.buffer);

        if (type && validMimeTypes.includes(type.mime)) {
          // Define the file path
          const filename = Date.now() + path.extname(file.originalname);
          const destinationPath = path.join(postDirectory, filename);
          console.log("Saving file to:", destinationPath);

          // Save file to disk
          await fs.writeFile(destinationPath, file.buffer);

          const imgPath = path.join("uploads", "posts", `${postId}`, filename);
          let is_cover = false;
          if (file.originalname === cover) is_cover = true;

          await pool.query(
            `INSERT INTO elb_productimage(product_id, image_path, is_cover) VALUES($1, $2, $3)`,
            [+postId, imgPath, is_cover]
          );
        } else {
        }
      }
      await pool.query(`COMMIT`);
      res.status(StatusCodes.CREATED).json({ data: `success` });
    } else {
      console.log(`file not uploaded!!`);
    }
  } catch (error) {
    console.log(error);
    await pool.query(`ROLLBACK`);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ data: `something went wrong!!` });
  }
};
