import supertest from "supertest";
import db from "../../../database/database";
import UserModel from "./../../Models/user.model";
import User from "./../../../types/user.types";
import app from "./../../../server";

/** ----------------------- **
 * * Supertest is a package that help us to call http request on the server and test the Endpoints..
 *
 * ^ Create a request Object:
 */

const userModel = new UserModel();
const request = supertest(app);
let token = "";

describe("* User API Endpoints", () => {
  /** --------- **
   * Preliminary steps:-
   */
  const user = {
    email: "test@test.com",
    user_name: "testUser",
    first_name: "Test",
    last_name: "User",
    password: "test1234",
  } as User;

  //^ Create Test user
  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser.id;
  });

  //^ Delete the db table after the test done
  afterAll(async () => {
    const conn = await db.connect();
    // if you aren't use uuid u need to add `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
    const sql = `DELETE FROM users;`;
    await conn.query(sql);
    conn.release();
  });

  /** --------- **
   * Test Cases:
   */

  describe("- Test Authenticate API: ", () => {
    it("Should be able to authenticate  to get token", async () => {
      const res = await request
        .post("/authenticate")
        .set("content-type", "application/json")
        .send({
          email: "test@test.com",
          password: "test1234",
        });

      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      expect(id).toBe(user.id);
      expect(email).toBe(user.email);
      token = userToken;
    });

    it("should be fail to authenticate with wrong email", async () => {
      const res = await request
        .post("/authenticate")
        .set("Content-Type", "application/json")
        .send({
          email: "wrong@test.com",
          password: "fake-password",
        });

      expect(res.status).toBe(401);
    });
  });

  describe("- Test CRUD API methods: ", () => {
    it("Should create new user", async () => {
      const res = await request
        .post("/db")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...user });

      expect(res.status).toBe(200);
      const { email, user_name, first_name, last_name } = res.body.data;
      expect(email).toBe(user.email);
      expect(user_name).toBe(user.user_name);
      expect(first_name).toBe(user.first_name);
      expect(last_name).toBe(user.last_name);
    });

    it("Should get list of users", async () => {
      const res = await request
        .get("/db")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });

    it("Should get user info", async () => {
      const res = await request
        .get(`/db/${user.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user_name).toBe(user.user_name);
      expect(res.body.data.email).toBe(user.email);
    });

    it("Should Update user info", async () => {
      const res = await request
        .patch(`/db/${user.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...user,
          user_name: "Mohamed Ahmed",
          first_name: "Mohamed",
          last_name: "Ahmed",
        });

      expect(res.status).toBe(200);
      const { id, email, user_name, first_name, last_name } = res.body.data;
      expect(email).toBe(user.email);
      expect(user_name).toBe("Mohamed Ahmed");
      expect(first_name).toBe("Mohamed");
      expect(last_name).toBe("Ahmed");
    });

    it("Should Delete user", async () => {
      const res = await request
        .delete(`/db/${user.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(user.email);
      expect(res.body.data.user_name).toBe("Mohamed Ahmed");
    });
  });
});
