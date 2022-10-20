import app from "./../../../server";
import supertest from "supertest";

import UserModel from "./../../Models/user.model";
import User from "./../../../types/user.types";
import db from "../../../database/database";

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
    email: "Ya@test.com",
    user_name: "Yasmina Salam",
    first_name: "Yasmina",
    last_name: "Salam",
    password: "test1234",
  } as User;

  //^ Create Test user
  beforeAll(async () => {
    // & Create user to test userModel methods
    const createdUser = await userModel.create(user);

    const fetchedUsers = await userModel.getAllUsers();
    user.id = fetchedUsers[0].id;

    // & Sign in to get access token:
    const res = await request
      .post("/api/user/authenticate")
      .set("Content-Type", "application/json")
      .send({
        email: "Ya@test.com",
        password: "test1234",
      });

    const { token: userToken } = res.body;

    // & Insert the token to the user object
    token = userToken;
    // console.log("<======================>", token);
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

  describe("- Test the Authenticate API: ", () => {
    it("-- Should be able to authenticate user to get access token!", async () => {
      const res = await request
        .post("/api/user/authenticate")
        .set("Content-Type", "application/json")
        .send({
          email: "Ya@test.com",
          password: "test1234",
        });

      expect(res.status).toBe(200);

      const { id, email } = res.body.data;
      expect(email).toBe(user.email);
      expect(id).toBe(user.id);
    });

    it("-- Should be fail to authenticate user with wrong email", async () => {
      const res = await request
        .post("/api/user/authenticate")
        .set("Content-Type", "application/json")
        .send({
          email: "wrong@test.com",
          password: "fake-password",
        });

      expect(res.status).toBe(401);
    });
  });

  describe("- Test CRUD operations for API methods: ", () => {
    it("-- Should create new User", async () => {
      const user2 = {
        email: "Aa@g.com",
        user_name: "Ameen Saad",
        first_name: "Ameen",
        last_name: "Saad",
        password: "password",
      };

      const res = await request
        .post("/api/user")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...user2 });

      // console.log("===========>", res.body.data);
      expect(res.status).toBe(200);

      const { email, user_name, first_name, last_name } = res.body.data;
      expect(email).toBe(user2.email);
      expect(user_name).toBe(user2.user_name);
      expect(first_name).toBe(user2.first_name);
      expect(last_name).toBe(user2.last_name);
    });

    it("-- Should get user info.", async () => {
      const res = await request
        .get(`/api/user/${user.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user_name).toBe(user.user_name);
      expect(res.body.data.email).toBe(user.email);
    });

    it("-- Should get list of All Users", async () => {
      const res = await request
        .get("/api/user")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      // expect(res.body.data.length).toBe(1);
    });

    it("-- Should Update user info", async () => {
      const res = await request
        .patch(`/api/user`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...user,
          user_name: "Mohamed Ahmed",
          first_name: "Mohamed",
          last_name: "Ahmed",
        });

      expect(res.status).toBe(200);
      console.log("===========> ", res.body.data);

      const { email, user_name, first_name, last_name } = res.body.data;
      expect(email).toBe(user.email);
      expect(user_name).toBe("Mohamed Ahmed");
      expect(first_name).toBe("Mohamed");
      expect(last_name).toBe("Ahmed");
    });

    it("-- Should Delete user", async () => {
      const res = await request
        .delete(`/api/user/${user.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(user.id);
      expect(res.body.data.user_name).toBe("Mohamed Ahmed");
    });
  });
});
