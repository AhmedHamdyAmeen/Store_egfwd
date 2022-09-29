import db from "../../database/database";
import User from "./../../types/user.types";

class UserModel {
  // Create User
  async create(u: User): Promise<User> {
    try {
      // Open connection with db
      const connection = await db.connect();

      // run query
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
      VALUES ($1, $2, $3, $4, $5) RETURNING email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
      ]);

      // Release connection
      connection.release();

      // return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to Create (${u.user_name}): ${(error as Error).message}`
      );
    }
  }
  // Get all users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id ,email, user_name, first_name, last_name FROM users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving users: ${(error as Error).message} `
      );
    }
  }

  // Get specific user
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE iD=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't find user ${id}, ${(error as Error).message}`);
    }
  }

  // Update user
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users
                  SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5
                  WHERE id=$6
                  RETURNING id, email, user_name, first_name, last_name`;

      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
        u.id,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't update user: ${u.user_name}, ${(error as Error).message}`
      );
    }
  }

  // Delete user
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users
                  WHERE id=($1)
                  RETURNING id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't delete user: ${id}, ${(error as Error).message}`
      );
    }
  }

  // Authenticate user
}

export default UserModel;

/**
 * DB can be represented as a Class in the code,
 *  and Each row represented as a instance of this class
 *
 * DB table name is always plural.. because it is hold many data..
 * but a model is a singular because it is a single template
 */
