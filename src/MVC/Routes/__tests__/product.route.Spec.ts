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

describe("* Product API Endpoints", () => {
  /** --------- **
   * Preliminary steps:-
   */
  const user = {
    email: "ZO@test.com",
    user_name: "Zienab Osama",
    first_name: "Zienab",
    last_name: "Osama",
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
        email: "ZO@test.com",
        password: "test1234",
      });

    const { token: userToken } = res.body;
    // Insert the token to the user object
    token = userToken;

    // & Create Product
    const createdProduct = await productModel.createProduct(product);
    const retrievedProduct = await productModel.getAllProducts();
    product.id = retrievedProduct[0].id;

    // console.log("CreatedUser: ", createdUser);
    // console.log("createdProduct: ", createdProduct);
    // console.log(token);
  });

  //^ Delete the db table after the test done
  afterAll(async () => {
    const conn = await db.connect();
    /** if you aren't use uuid u need to add `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
     */

    const sql = `DELETE FROM order_products`;
    const sql2 = `DELETE FROM products`;
    const sql3 = `DELETE FROM orders`;
    const sql4 = `DELETE FROM users`;

    await conn.query(sql);
    await conn.query(sql2);
    await conn.query(sql3);
    await conn.query(sql4);

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
        .send(product);

      expect(res.status).toBe(200);

      const { product_name, product_price, product_description } =
        res.body.data;
      expect(product_name).toBe(product.product_name);
      expect(product_price).toBe(product.product_price?.toFixed(2));
      expect(product_description).toBe(product.product_description);
    });

    it("-- Should get Product info.", async () => {
      const res = await request
        .get(`/api/product/${product.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data[0].product_name).toBe(product.product_name);
      expect(res.body.data[0].product_price).toBe(
        product.product_price?.toFixed(2)
      );
    });

    it("-- Should get list of All Products", async () => {
      const res = await request
        .get("/api/product")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
    });

    it("-- Should Update Product info", async () => {
      // console.log("=============>> ", product);

      const res = await request
        .put(`/api/product`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...product,
          product_name: "Gaming Keyboard 20",
          product_price: 600,
        });

      expect(res.status).toBe(200);
      // console.log("===========> ", res.body.data);

      const { product_name, product_price, product_description } =
        res.body.data;
      expect(product_name).toBe("Gaming Keyboard 20");
      expect(product_price).toBe((600 as number).toFixed(2));
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
