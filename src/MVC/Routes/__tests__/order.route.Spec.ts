import app from "./../../../server";
import supertest from "supertest";

import UserModel from "./../../Models/user.model";
import OrderModel from "../../Models/order.model";
import User from "./../../../types/user.types";
import Order from "../../../types/order.types";

import db from "../../../database/database";

/** Instantiate instance from UserModel Class
 */
const userModel = new UserModel();
const orderModel = new OrderModel();
/** Create a request Object
 */
const request = supertest(app);
let token = "";

describe("* Order API Endpoints", () => {
  /** --------- **
   * Preliminary steps:-
   */
  const user = {
    email: "Sa@test.com",
    user_name: "Saad Salam",
    first_name: "Saad",
    last_name: "Salam",
    password: "test1234",
  } as User;

  const order: Order = {
    order_name: "Gaming Mouse",
    price: 435,
    order_status: "active",
    user_id: user.id,
  };

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

    // & Create Order to test OrderModel
    const createdOrder = await orderModel.create(order);
    const retrievedOrder = await orderModel.getAllOrders();
    order.id = retrievedOrder[0].id;
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

  describe("- Test CRUD operations for API methods: ", () => {
    it("-- Should create new Order", async () => {
      const order: Order = {
        order_name: "Gaming Keyboard",
        price: 43,
        order_status: "active",
        user_id: user.id,
      };

      const res = await request
        .post("/api/order")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...order });

      // console.log("===========>", res.body.data);
      expect(res.status).toBe(200);

      const { order_name, price, order_status, user_id } = res.body.data;
      expect(order_name).toBe(order.order_name);
      expect(price).toBe(order.price);
      expect(order_status).toBe(order.order_status);
      expect(user_id).toBe(order.user_id);
    });

    it("-- Should get Order info.", async () => {
      const res = await request
        .get(`/api/order/${order.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.order_name).toBe(order.order_name);
      expect(res.body.data.price).toBe(order.price);
    });

    it("-- Should get list of All Order", async () => {
      const res = await request
        .get("/api/order")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });

    it("-- Should Update Order info", async () => {
      const res = await request
        .patch(`/api/order`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...order,
          order_name: "Gaming Monitor",
          price: 745,
        });

      expect(res.status).toBe(200);
      // console.log("===========> ", res.body.data);

      const { order_name, price, order_status, user_id } = res.body.data;
      expect(order_name).toBe("Gaming Monitor");
      expect(price).toBe(745);
      expect(order_status).toBe("active");
    });

    it("-- Should Delete Order", async () => {
      const res = await request
        .delete(`/api/order/${order.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(order.id);
      expect(res.body.data.order_name).toBe("Gaming Monitor");
    });
  });
});
