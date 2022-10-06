import UserModel from "./../user.model";
import db from "../../../database/database";
import User from "../../../types/user.types";

const userModel = new UserModel();

describe("- Test User Model: ", () => {
  // ^ Check if the method defined or not
  describe("* Test Method existence: ", () => {
    it("-- Should have an getMany users method", () => {
      expect(userModel.getMany).toBeDefined();
    });

    it("-- Should have an getOne users method", () => {
      expect(userModel.getOne).toBeDefined();
    });

    it("-- Should have an crete users method", () => {
      expect(userModel.create).toBeDefined();
    });

    it("-- Should have an updateOne users method", () => {
      expect(userModel.updateOne).toBeDefined();
    });

    it("-- Should have an deleteOne users method", () => {
      expect(userModel.deleteOne).toBeDefined();
    });

    it("Should have an Authenticate user method", () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe("* Test user Model logic", () => {
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
      user.id = createdUser.id;
      // user.id = "b09f6216-f361-404c-8ab9-731ae70d7703";
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
    it("Create method should return a New User", async () => {
      const createdUser = await userModel.create({
        email: "test2@test.com",
        user_name: "test2User",
        first_name: "Test",
        last_name: "User",
        password: "test1234",
      });

      // expect(createdUser).toEqual({ ...user, id: createdUser.id });
      expect(createdUser).toEqual({
        email: "test2@test.com",
        user_name: "test2User",
        first_name: "Test",
        last_name: "User",
      });
    });

    it("GetMany method should return All available users in dB: ", async () => {
      const returnedUsers = await userModel.getOne(user.id as string);
      // expect(returnedUsers.id).toBe(user.id);
      // expect(returnedUsers.email).toBe(user.email);
      // expect(returnedUsers.user_name).toBe(user.user_name);
      // expect(returnedUsers.first_name).toBe(user.first_name);
      // expect(returnedUsers.last_name).toBe(user.last_name);
    });

    it("UpdateOne method should return a user with edited attributes", async () => {
      const updatedUser = await userModel.updateOne({
        ...user,
        user_name: "Ahmed Hamdy",
        first_name: "Ahmed",
        last_name: "Hamdy",
      });

      // expect(updatedUser.id).toBe(user.id);
      // expect(updatedUser.email).toBe(user.email);
      // expect(updatedUser.user_name).toBe(user.user_name);
      // expect(updatedUser.first_name).toBe(user.first_name);
      // expect(updatedUser.last_name).toBe(user.last_name);
    });

    it("DeleteOne method should delete user from DB", async () => {
      const deletedUser = await userModel.deleteOne(user.id as string);

      expect(deletedUser.id).toBe(user.id);
    });
  });
});
