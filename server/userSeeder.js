import { faker } from "@faker-js/faker";
import pool from "../server/db.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../server/utils/passwordUtils.js";
import dayjs from "dayjs";
import { generateSlug } from "../server/utils/functions.js";

const insertUserDb = async () => {
  try {
    await pool.query(`BEGIN`);

    const users = [];

    for (let index = 0; index < 100; index++) {
      const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        mobile: faker.phone.number(),
        created_at: dayjs(new Date(), "Asia/Kolkata").format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        updated_at: dayjs(new Date(), "Asia/Kolkata").format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        role_id: faker.number.int({ min: 1, max: 2 }),
      };
      users.push(user);
    }

    for (const user of users) {
      const userPassword = await hashPassword(`welcome123`);
      const userUuid = uuidv4();
      let newUser = { ...user, password: userPassword, uuid: userUuid };
      const nameSlug = await generateSlug(user.first_name, user.last_name);

      await pool.query(
        `insert into elb_users(first_name, last_name, email, mobile, password, uuid, created_at, updated_at, rid, slug) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.mobile,
          userPassword,
          userUuid,
          user.created_at,
          user.updated_at,
          user.role_id,
          nameSlug,
        ]
      );
    }

    await pool.query(`COMMIT`);
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
    return error;
  }
};

insertUserDb();
