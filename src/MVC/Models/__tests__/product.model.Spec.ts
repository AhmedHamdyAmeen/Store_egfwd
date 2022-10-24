import ProductModel from "../product.model";
import UserModel from "../user.model";
import Product from "../../../types/product.types";
import User from "../../../types/user.types";
import db from "../../../database/database";

/** Instantiate instance from ProductModel Class
 */
const productModel = new ProductModel();
const userModel = new UserModel();

describe("- Test Product Model: ", () => {
  /** Check Method Existence:
   */
  describe("* Test Method Existence: ", () => {
    // ^ orders table:
    it("-- Should have a getAllProducts method.", () => {
      expect(productModel.getAllProducts).toBeDefined();
    });

    it("-- Should have a getProduct method.", () => {
      expect(productModel.getProduct).toBeDefined();
    });

    it("-- Should have a createProduct method.", () => {
      expect(productModel.createProduct).toBeDefined();
    });

    it("-- Should have an updateProduct method.", () => {
      expect(productModel.updateProduct).toBeDefined();
    });

    it("-- Should have a deleteProduct method.", () => {
      expect(productModel.deleteProduct).toBeDefined();
    });
  });

  /** Test ProductModel Logic:
   */
  describe("* Test ProductModel Logic: ", () => {
    /** --------- **
     * Preliminary steps:-
     */

    const user: User = {
      email: "Hl@test.com",
      user_name: "Helal Mohamed",
      first_name: "Helal",
      last_name: "Mohamed",
      password: "test1234",
    };

    const product: Product = {
      product_name: "IPhone 20",
      product_price: 499,
      product_description: "Good Description",
    };

    // ^ Create Test Order & User
    beforeAll(async () => {
      // & Create User:
      const createdUser = await userModel.create(user);
      const fetchedUsers = await userModel.getAllUsers();
      user.id = fetchedUsers[0].id;

      // & Create Product
      const createdProduct = await productModel.createProduct(product);
      const retrievedProduct = await productModel.getAllProducts();
      product.id = retrievedProduct[0].id;
    });

    // ^ Delete the db table after the test done
    afterAll(async () => {
      const conn = await db.connect();
      /** If you aren't use uuid ==> you need to alter the id sequence..
       * add: `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
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

    it("-- CreateProduct method should returns a new Product", async () => {
      const product: Product = {
        product_name: "Samsung 42",
        product_price: 634,
        product_description: "Good Description",
      };

      const createdProduct = await productModel.createProduct(product);

      // expect(createdProduct).toEqual({ ...product, id: product.id });
      expect(createdProduct.product_name).toEqual(product.product_name);
    });

    it("-- GetAllProducts method should returns all available Products in db.", async () => {
      const retrievedProducts = await productModel.getAllProducts();

      expect(retrievedProducts[0].product_name).toBe(product.product_name);
      expect(retrievedProducts[0].product_name).toBe(product.product_name);
      expect(retrievedProducts[0].product_description).toBe(
        product.product_description
      );
    });

    it("-- UpdateProduct method should returns the updated Product.", async () => {
      const uProduct: Product = {
        product_name: "IPhone 15",
        product_price: 322,
        product_description: "Good Description",
      };

      const updatedOrder = await productModel.updateProduct({
        ...uProduct,
        id: product.id,
      });

      expect(updatedOrder?.product_name).toBe(uProduct.product_name);
      expect(updatedOrder?.product_price).toBe(
        uProduct.product_price?.toFixed(2) as unknown as number
      );
      expect(updatedOrder?.product_description).toBe(
        uProduct.product_description
      );
    });

    it("-- DeleteProduct method should delete Product from DB.", async () => {
      const deletedProduct = await productModel.deleteProduct(
        product.id as string
      );

      expect(deletedProduct.id).toBe(product.id);
    });
  });
});
