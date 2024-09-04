import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import {
  generateOtherSlug,
  getUserId,
  paginationLogic,
} from "../utils/functions.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import dayjs from "dayjs";
import { BadRequestError } from "../errors/customErrors.js";

// ------
export const addPost = async (req, res) => {
  const obj = { ...req.body };
  const {
    catId,
    subcatId,
    title,
    description,
    price,
    pinCode,
    city,
    state,
    address,
    isNew,
  } = obj;
  const { token_elb } = req.cookies;
  const { uuid } = verifyJWT(token_elb);
  const userId = await getUserId(uuid);
  const productAddress = address ? address : null;
  const productDesc = description || null;
  const productSlug = await generateOtherSlug("elb_product", title);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  try {
    await pool.query(`BEGIN`);

    const master = await pool.query(
      `insert into elb_product(user_id, title, cat_id, subcat_id, description, price, pincode, city, state, address, is_new, slug, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning id`,
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
        productAddress,
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

    // const postDirectory = path.join("public", "uploads", "posts", `${postId}`);
    // await fs.mkdir(postDirectory, { recursive: true });
    // const validMimeTypes = [
    //   "image/jpeg",
    //   "image/png",
    //   "image/jpg",
    //   "image/gif",
    //   "image/webp",
    // ];
    // if (req.files && req.files.length > 0) {
    //   for (const file of req.files) {
    //     // Ensure file.buffer is valid
    //     if (!file.buffer) {
    //       console.log("File buffer is missing");
    //       continue;
    //     }

    //     const type = await fileTypeFromBuffer(file.buffer);

    //     if (type && validMimeTypes.includes(type.mime)) {
    //       // Define the file path
    //       const filename = Date.now() + path.extname(file.originalname);
    //       const destinationPath = path.join(postDirectory, filename);
    //       console.log("Saving file to:", destinationPath);

    //       // Save file to disk
    //       await fs.writeFile(destinationPath, file.buffer);

    //       const imgPath = path.join("uploads", "posts", `${postId}`, filename);
    //       let is_cover = false;
    //       if (file.originalname === cover) is_cover = true;

    //       await pool.query(
    //         `INSERT INTO image_posts(post_id, image_path, is_cover)
    //       VALUES($1, $2, $3)`,
    //         [+postId, imgPath, is_cover]
    //       );
    //     } else {
    //     }
    //   }
    //   await pool.query(`COMMIT`);

    //   res.status(StatusCodes.CREATED).json({ data: `success` });
    // } else {
    //   console.log(`file not uploaded!!`);
    // }

    await pool.query(`COMMIT`);

    res.status(StatusCodes.CREATED).json({ data: `success` });
  } catch (error) {
    console.log(error);
    await pool.query(`ROLLBACK`);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ data: `something went wrong!!` });
  }
};

// ------
export const adminListPost = async (req, res) => {
  const { page, search, category: catId } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search
    ? ` and (pm.title ilike '%${search.trim()}%' or um.first_name ilike '%${search.trim()}%' or um.last_name ilike '%${search.trim()}%')`
    : ``;
  const searchDrp = catId ? ` and pm.subcat_id=${catId}` : ``;

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
    where pm.id is not null ${searchStr} ${searchDrp} order by pm.title, um.first_name, um.last_name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select pm.* from elb_product pm join elb_users um on pm.user_id = um.id where pm.id is not null ${searchStr} ${searchDrp}`,
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
export const getSinglePost = async (req, res) => {};

// ------
export const updatePost = async (req, res) => {};

// ------
export const deletePost = async (req, res) => {};

// ------
export const toggleFeatured = async (req, res) => {
  const { id } = req.params;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const isFeatured = await pool.query(
    `select is_feature from elb_product where id=$1 and is_sold=false`,
    [id]
  );
  if (isFeatured.rowCount === 0)
    throw new BadRequestError(
      `Product is already sold! Cannot be featured now`
    );
  const newFeatured = isFeatured.rows[0].is_feature === true ? false : true;

  await pool.query(
    `update elb_product set is_feature=$1, updated_at=$2 where id=$3`,
    [newFeatured, timeStamp, id]
  );
  res.status(StatusCodes.ACCEPTED).json({ status: newFeatured });
};

// ------
export const toggleSold = async (req, res) => {
  const { id } = req.params;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const isSold = await pool.query(
    `select is_sold from elb_product where id=$1`,
    [id]
  );
  const newSold = isSold.rows[0].is_sold === true ? false : true;

  await pool.query(
    `update elb_product set is_sold=$1, updated_at=$2 where id=$3`,
    [newSold, timeStamp, id]
  );
  res.status(StatusCodes.ACCEPTED).json({ status: newSold });
};
