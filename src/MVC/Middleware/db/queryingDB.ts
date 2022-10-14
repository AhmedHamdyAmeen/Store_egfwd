import db from "../../../database/database";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryingDB = async (sql: string, params?: any[]) => {
  try {
    const connection = await db.connect();
    /** If there is array of params sent
     */
    if (params) {
      const result = await connection.query(sql, params);
      connection.release(); // Release the db connection

      return result;
    }

    /** If there is no array of params sent
     */
    const result = await connection.query(sql);
    connection.release();

    return result;
  } catch (error) {
    throw new Error(`Couldn't querying the Data: ${(error as Error).message}`);
  }
};

export default queryingDB;
