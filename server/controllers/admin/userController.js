import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../../utils/passwordUtils.js";
import { generateSlug, paginationLogic } from "../../utils/functions.js";
import dayjs from "dayjs";

// ------
export const addUser = async (req, res) => {
  const { firstName, lastName, email, mobile, isAdmin } = req.body;
  const createdAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const userUuid = uuidv4();
  const userPass = await hashPassword(`welcome123`);
  const userSlug = await generateSlug(firstName.trim(), lastName.trim());
  const roleId = isAdmin ? 1 : 2;

  const data = await pool.query(
    `insert into elb_users(first_name, last_name, email, mobile, password, created_at, updated_at, uuid, slug, rid) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
    [
      firstName.trim(),
      lastName.trim(),
      email,
      mobile,
      userPass,
      createdAt,
      updatedAt,
      userUuid,
      userSlug,
      roleId,
    ]
  );

  res.status(StatusCodes.CREATED).json({ data });
};

// ------
export const listUsers = async (req, res) => {
  const { page, search, type: role } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search
    ? ` and (elb_users.first_name ilike '%${search.trim()}%' or elb_users.last_name ilike '%${search.trim()}%' or elb_users.email ilike '%${search.trim()}%' or elb_users.mobile ilike '%${search.trim()}%')`
    : ``;
  const searchDrp = role ? ` and elb_users.rid=${role}` : ``;

  const data = await pool.query(
    `select elb_users.*, master_role.role from elb_users join master_role on elb_users.rid = master_role.id where elb_users.id is not null ${searchStr} ${searchDrp} order by elb_users.first_name, elb_users.last_name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select elb_users.* from elb_users join master_role on elb_users.rid = master_role.id where elb_users.id is not null ${searchStr} ${searchDrp}`,
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
export const editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, mobile, isAdmin } = req.body;
  const updatedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const newSlug = await generateSlug(firstName.trim(), lastName.trim());
  const roleId = isAdmin ? 1 : 2;

  const data = await pool.query(
    `update elb_users set first_name=$1, last_name=$2, email=$3, mobile=$4, rid=$5, updated_at=$7, slug=$8 where id=$6 returning *`,
    [
      firstName.trim(),
      lastName.trim(),
      email,
      mobile,
      roleId,
      id,
      updatedAt,
      newSlug,
    ]
  );

  res.status(StatusCodes.ACCEPTED).json({ data });
};

// ------
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await pool.query(`update elb_users set is_active=false where id=$1`, [id]);

  res.status(StatusCodes.NO_CONTENT).json(`removed`);
};

// ------
export const activateUser = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(
    `update elb_users set is_active=true where id=$1`,
    [id]
  );

  res.status(StatusCodes.ACCEPTED).json(`success`);
};
