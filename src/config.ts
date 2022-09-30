import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  HOST,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_test,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  BCRYPT_SALT,
  JWT_SECRET_TOKEN,
} = process.env;

/** Select the appropriate DB base on the type NODE_ENV
 */

const DATABASE = NODE_ENV === "dev" ? POSTGRES_DB_test : POSTGRES_DB;

export {
  PORT,
  HOST,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE,
  BCRYPT_PASSWORD,
  BCRYPT_SALT,
  JWT_SECRET_TOKEN,
};
