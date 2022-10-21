import UserModel from "./../user.model";
import User from "../../../types/user.types";
import db from "../../../database/database";

/** Instantiate instance from UserModel Class
 */
const userModel = new UserModel();

describe("- Test User Model: ", () => {
  // ^ Check if the method defined or not
  describe("* Test Method existence: ", () => {
    it("-- Should have an getAllUsers method", () => {
      expect(userModel.getAllUsers).toBeDefined();
    });

    it("-- Should have a getUser method", () => {
      expect(userModel.getUser).toBeDefined();
    });

    it("-- Should have a creteUser method", () => {
      expect(userModel.create).toBeDefined();
    });

    it("-- Should have an updateUser users method", () => {
      expect(userModel.updateUser).toBeDefined();
    });

    it("-- Should have a deleteUser users method", () => {
      expect(userModel.deleteUser).toBeDefined();
    });

    it("-- Should have an Authenticate user method", () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe("* Test userModel logic: ", () => {
    /** --------- **
     * Preliminary steps:-
     */
    const user: User = {
      email: "test@test.com",
      user_name: "testUser",
      first_name: "Test",
      last_name: "User",
      password: "test1234",
    };

    //^ Create Test user
    beforeAll(async () => {
      const createdUser = await userModel.create(user);

      const fetchedUsers = await userModel.getAllUsers();
      user.id = fetchedUsers[0].id;
    });

    //^ Delete the db table after the test done
    afterAll(async () => {
      const conn = await db.connect();
      /** If you aren't use uuid ==> you need to alter the id sequence..
       * add: `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
       */
      const sql = `DELETE FROM users;`;
      await conn.query(sql);
      conn.release();
    });

    /** --------- **
     * Test Cases:
     */
    it("-- CreateUser method should returns a New User", async () => {
      const createdUser = await userModel.create({
        email: "Ahmed2@test.com",
        user_name: "Ahmed2Ameen",
        first_name: "Ahmed",
        last_name: "Ameen",
        password: "test@1234",
      });

      expect(createdUser).toEqual({
        email: "Ahmed2@test.com",
        user_name: "Ahmed2Ameen",
        first_name: "Ahmed",
        last_name: "Ameen",
      });
    });

    it("-- GetAllUsers method should returns All available users in dB.", async () => {
      const returnedUsers = await userModel.getUser(user.id as string);
      // expect(returnedUsers.id).toBe(user.id);
      expect(returnedUsers.email).toBe(user.email);
      expect(returnedUsers.user_name).toBe(user.user_name);
      expect(returnedUsers.first_name).toBe(user.first_name);
      expect(returnedUsers.last_name).toBe(user.last_name);
    });

    it("-- UpdateUser method should return the updated User.", async () => {
      const updatedUser = await userModel.updateUser({
        ...user,
        user_name: "Ahmed Hamdy",
        first_name: "Ahmed",
        last_name: "Hamdy",
      });

      // expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.email).toBe(user.email);
      expect(updatedUser.user_name).toBe("Ahmed Hamdy");
      expect(updatedUser.first_name).toBe("Ahmed");
      expect(updatedUser.last_name).toBe("Hamdy");
    });

    it("-- DeleteUser method should delete user from DB", async () => {
      const deletedUser = await userModel.deleteUser(user.id as string);

      expect(deletedUser.id).toEqual(deletedUser.id);
    });
  });
});
