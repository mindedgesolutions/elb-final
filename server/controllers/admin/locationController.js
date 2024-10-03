import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";

// ------
export const allLocations = async (req, res) => {
  const data = await pool.query(
    `select * from master_locations where is_active=true order by city`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};
