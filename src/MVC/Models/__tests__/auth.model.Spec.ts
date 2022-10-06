import UserModel from "../user.model";
import db from "../../../database/database";
import User from "./../../../types/user.types";

/** Create the instance from UserModel
 */

const userModel = new UserModel();

/**  Test suite for Authentication Model
 */
describe("- Authentication Model:- ", () => {
  // Test Cases:-

  describe("* Test method existence: ", () => {
    it("Should have an Authenticate user method", () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe("* Test Authenticate Logic: ", () => {
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
    it("Authenticate Method should return the authenticated user", async () => {
      const authenticatedUser = await userModel.authenticate(
        user.email as string,
        user.password as string
      );
      expect(authenticatedUser?.email).toBe(user.email);
      expect(authenticatedUser?.user_name).toBe(user.user_name);
      expect(authenticatedUser?.first_name).toBe(user.first_name);
      expect(authenticatedUser?.last_name).toBe(user.last_name);
    });

    it("Authenticate Method Should return null for wrong credentials", async () => {
      const authenticatedUser = await userModel.authenticate(
        "a@ameen.com",
        "fake_password"
      );
      expect(authenticatedUser).toBeNull();
      // expect(authenticatedUser).toBe(null);
    });
  });
});
