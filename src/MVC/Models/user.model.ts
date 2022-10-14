import db from "../../database/database";
import User from "./../../types/user.types";
import { hashPassword, comparePasswords } from "../Helpers/hashPassword";

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
        hashPassword(u.password as string),
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
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
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
        hashPassword(u.password as string),
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
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = "SELECT password FROM users WHERE email=$1";
      const result = await connection.query(sql, [email]);

      // if the user found in the database
      if (result.rows.length) {
        const { password: hashedPassword } = result.rows[0];

        const isPasswordValid = comparePasswords(password, hashedPassword);

        if (isPasswordValid) {
          const userSql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)`;
          const userInfo = await connection.query(userSql, [email]);
          connection.release();

          return userInfo.rows[0];
        }
      }

      // if the user isn't found in the database
      connection.release();
      return null;
    } catch (error) {
      throw new Error(` ${(error as Error).message}`);
    }
  }
}

export default UserModel;

/**
 * DB can be represented as a Class in the code,
 *  and Each row represented as a instance of this class
 *
 * DB table name is always plural.. because it is hold many data..
 * but a model is a singular because it is a single template
 */
