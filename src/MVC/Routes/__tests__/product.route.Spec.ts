import app from "./../../../server";
import supertest from "supertest";

import UserModel from "./../../Models/user.model";
import ProductModel from "../../Models/product.model";
import User from "./../../../types/user.types";
import Product from "../../../types/product.types";

import db from "../../../database/database";

/** Instantiate instance from UserModel Class
 */
const userModel = new UserModel();
const productModel = new ProductModel();
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

  const product: Product = {
    product_name: "IPhone 20",
    product_price: 499,
    product_description: "Good Description",
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
        email: "Sa@test.com",
        password: "test1234",
      });
    const { token: userToken } = res.body;

    // & Insert the token to the user object
    token = userToken;

    // & Create Product
    const createdProduct = await productModel.createProduct(product);
    const retrievedProduct = await productModel.getAllProducts();
    product.id = retrievedProduct[0].id;
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
    it("-- Should create new Product", async () => {
      const product: Product = {
        product_name: "Gaming Mouse 20",
        product_price: 52,
        product_description: "Good Description",
      };

      const res = await request
        .post("/api/product")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...product });

      expect(res.status).toBe(200);

      const { product_name, product_price, product_description } =
        res.body.data;
      expect(product_name).toBe(product.product_name);
      expect(product_price).toBe(product.product_price);
      expect(product_description).toBe(product.product_description);
    });

    it("-- Should get Product info.", async () => {
      const res = await request
        .get(`/api/product/${product.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.product_name).toBe(product.product_name);
      expect(res.body.data.product_price).toBe(product.product_price);
    });

    it("-- Should get list of All Products", async () => {
      const res = await request
        .get("/api/product")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });

    it("-- Should Update Product info", async () => {
      const res = await request
        .patch(`/api/product`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_name: "Gaming Keyboard 20",
          product_price: 499,
          product_description: "Good Description",
        });

      expect(res.status).toBe(200);
      // console.log("===========> ", res.body.data);

      const { product_name, product_price, product_description } =
        res.body.data;
      expect(product_name).toBe("Gaming Keyboard 20");
      expect(product_price).toBe(499);
      expect(product_description).toBe("Good Description");
    });

    it("-- Should Delete Product", async () => {
      const res = await request
        .delete(`/api/product/${product.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(product.id);
      expect(res.body.data.product_name).toBe("Gaming Keyboard 20");
    });
  });
});
