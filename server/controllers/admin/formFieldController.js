import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { paginationLogic, removeSpecialChars } from "../../utils/functions.js";
import dayjs from "dayjs";
import slug from "slug";
import { BadRequestError } from "../../errors/customErrors.js";

// ------
export const addFormField = async (req, res) => {
  const { subcatId, formLabel, fieldType, isRequired, options } = req.body;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  let ffName = "";
  formLabel?.split(" ")?.map((i, index) => {
    ffName +=
      index === 0
        ? removeSpecialChars(i?.toLowerCase())
        : `_` + removeSpecialChars(i?.toLowerCase());
  });
  ffName = ffName + `_${subcatId}`;

  const checkName = await pool.query(
    `select count(*) from master_form_fields where field_name=$1`,
    [ffName]
  );

  if (Number(checkName.rows[0].count) > 0)
    throw new BadRequestError(`Form field exists`);

  try {
    await pool.query("BEGIN");

    const data = await pool.query(
      `insert into master_form_fields(cat_id, field_label, field_type, field_name, is_required, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7) returning id`,
      [
        subcatId,
        formLabel.trim(),
        fieldType.toLowerCase(),
        ffName,
        isRequired,
        timeStamp,
        timeStamp,
      ]
    );

    if (options[0]) {
      await pool.query(
        `delete from master_form_field_options where field_id=$1`,
        [data.rows[0].id]
      );

      for (const option of options) {
        const optionSlug = slug(option);

        await pool.query(
          `insert into master_form_field_options(field_id, option_value, slug, created_at, updated_at) values($1, $2, $3, $4, $5)`,
          [data.rows[0].id, option.trim(), optionSlug, timeStamp, timeStamp]
        );
      }
    }

    await pool.query("COMMIT");

    res.status(StatusCodes.CREATED).json(`success`);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(StatusCodes.BAD_REQUEST).json(`failed`);
  }
};

// ------
export const listFormFields = async (req, res) => {
  const { page, parent } = req.query;
  const pagination = paginationLogic(page, null);

  const searchDrp = parent ? ` and ff.cat_id=${parent}` : ``;

  const data = await pool.query(
    `select
			ff.*,
			json_agg(
        json_build_object(
          'id', fo.id,
          'value', fo.option_value
        )
      ) AS field_options,
			mc.category
    from master_form_fields ff
    left join master_form_field_options fo on ff.id = fo.field_id 
    join master_categories mc on ff.cat_id = mc.id 
    where ff.id is not null ${searchDrp} group by ff.id, mc.category 
		order by mc.category offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select ff.* from master_form_fields ff where ff.id is not null ${searchDrp}`,
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
export const getFormFieldDetails = async (req, res) => {
  const { id } = req.params;

  const data = await pool.query(
    `select
			ff.*,
			json_agg(
        json_build_object(
          'id', fo.id,
          'value', fo.option_value
        )
      ) AS field_options,
			mc.category
    from master_form_fields ff
    left join master_form_field_options fo on ff.id = fo.field_id 
    join master_categories mc on ff.cat_id = mc.id 
    where ff.id=$1 group by ff.id, mc.category`,
    [id]
  );
  res.status(StatusCodes.OK).json({ data });
};

// ------
export const updateFormField = async (req, res) => {
  const { id } = req.params;
  const { subcatId, formLabel, fieldType, isRequired, options } = req.body;
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  let ffName = "";
  formLabel?.split(" ")?.map((i, index) => {
    ffName +=
      index === 0
        ? removeSpecialChars(i?.toLowerCase())
        : `_` + removeSpecialChars(i?.toLowerCase());
  });
  ffName = ffName + `_${subcatId}`;

  const checkName = await pool.query(
    `select count(*) from master_form_fields where field_name=$1 and id!=$2`,
    [ffName, id]
  );

  if (Number(checkName.rows[0].count) > 0)
    throw new BadRequestError(`Form field exists`);

  try {
    await pool.query("BEGIN");

    const data = await pool.query(
      `update master_form_fields set cat_id=$1, field_label=$2, field_type=$3, field_name=$4, is_required=$5, updated_at=$6 where id=$7 returning id`,
      [
        subcatId,
        formLabel.trim(),
        fieldType.toLowerCase(),
        ffName,
        isRequired,
        timeStamp,
        id,
      ]
    );

    await pool.query(
      `delete from master_form_field_options where field_id=$1`,
      [data.rows[0].id]
    );

    if (fieldType === "radio" && options[0]) {
      for (const option of options) {
        const optionSlug = slug(option);

        await pool.query(
          `insert into master_form_field_options(field_id, option_value, slug, created_at, updated_at) values($1, $2, $3, $4, $5)`,
          [data.rows[0].id, option.trim(), optionSlug, timeStamp, timeStamp]
        );
      }
    }

    await pool.query("COMMIT");

    res.status(StatusCodes.ACCEPTED).json(`success`);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(StatusCodes.BAD_REQUEST).json(`failed`);
  }
};

// ------
export const deleteFormField = async (req, res) => {};

// ------
export const postFormFields = async (req, res) => {
  const { catid } = req.params;
  const data = await pool.query(
    `select 
      f.*,
      json_agg(
        json_build_object(
          'option_id', o.id,
          'option_value', o.option_value
        )
      ) as options
    from master_form_fields f
    left join master_form_field_options o on f.id = o.field_id
    where f.cat_id = $1
    group by f.id`,
    [catid]
  );

  res.status(StatusCodes.OK).json({ data });
};
