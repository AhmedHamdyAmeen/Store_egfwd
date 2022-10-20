import { Pool } from "pg";

import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DATABASE,
} from "../config";

/** Create db Pool:-
 */

const pool = new Pool({
  host: POSTGRES_HOST,
  database: DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string, 10),
});

/** Listen on the Error:
 */
pool.on("error", (err: Error) => {
  console.log(err.message);
});

export default pool;
