import OrderModel from "../order.model";
import UserModel from "./../user.model";
import ProductModel from "../product.model";

import Order from "../../../types/order.types";
import User from "./../../../types/user.types";
import Product from "../../../types/product.types";

import db from "../../../database/database";
import Order_product from "./../../../types/order_product.types";

/** Instantiate instance from UserModel Class
 */
const orderModel = new OrderModel();
const userModel = new UserModel();
const productModel = new ProductModel();

describe("- Test Order Model: ", () => {
  /** Check Method Existence:
   */
  describe("* Test Method Existence: ", () => {
    // ^ orders table:
    it("-- Should have a getAllOrders method.", () => {
      expect(orderModel.getAllOrders).toBeDefined();
    });

    it("-- Should have a getOrder method.", () => {
      expect(orderModel.getOrder).toBeDefined();
    });

    it("-- Should have a create method.", () => {
      expect(orderModel.create).toBeDefined();
    });

    it("-- Should have an update method.", () => {
      expect(orderModel.update).toBeDefined();
    });

    it("-- Should have a delete method.", () => {
      expect(orderModel.delete).toBeDefined();
    });

    // ^ order_products table:
    it("-- Should have a addOrderProduct method.", () => {
      expect(orderModel.addOrderProduct).toBeDefined();
    });

    it("-- Should have an updateOrderProduct method.", () => {
      expect(orderModel.updateOrderProduct).toBeDefined();
    });

    it("-- Should have an removeOrderProduct method.", () => {
      expect(orderModel.removeOrderProduct).toBeDefined();
    });
  });

  /** Test OrderModel Logic:
   */
  describe("* Test OrderModel Logic: ", () => {
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

    const order: Order = {
      order_name: "New Office Keyboard for CashCall company",
      price: 352,
      order_status: "active",
      user_id: user.id, // undefined
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

      // & Create order
      const createdOrder = await orderModel.create(order);
      const fetchedOrder = await orderModel.getAllOrders();
      order.id = fetchedOrder[0].id;
      order.user_id = user.id;
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

    it("-- CreateOrder method should returns a new Order", async () => {
      const order2: Order = {
        order_name: "RAM",
        price: 120,
        order_status: "active",
        user_id: user.id,
      };

      const createdOrder = await orderModel.create(order2);

      // expect(createdOrder).toEqual({ ...order2 });
      expect(createdOrder.order_name).toEqual(order2.order_name);
    });

    it("-- GetAllOrders method should returns all available users in db.", async () => {
      const retrievedOrders = await orderModel.getAllOrders();

      expect(retrievedOrders[0].order_name).toBe(order.order_name);
      expect(retrievedOrders[0].price as number).toBe(
        order.price?.toFixed(2) as unknown as number
      );
      expect(retrievedOrders[0].order_status).toBe(order.order_status);
      // expect(retrievedOrders[0].user_id).toBe(order.user_id);
    });

    it("-- UpdateOrder method should returns the updated Order.", async () => {
      const uOrder: Order = {
        order_name: "Keyboard",
        price: 664,
        order_status: "done",
        user_id: user.id,
      };

      // console.log("==========>", user.id);
      // console.log("==========>", order.id);
      // console.log("==========>", product.id);

      const updatedOrder = await orderModel.update({ ...uOrder, id: order.id });

      expect(updatedOrder?.order_name).toBe(uOrder.order_name);
      expect(updatedOrder?.price as number).toBe(
        uOrder.price?.toFixed(2) as unknown as number
      );
      expect(updatedOrder?.order_status).toBe(uOrder.order_status);
      expect(updatedOrder?.user_id).toBe(uOrder.user_id);
    });

    it("-- AddOrderProduct method should create orderProduct in the db", async () => {
      const oProduct: Order_product = {
        quantity: 5,
        product_id: product.id,
        order_id: order.id,
      };

      const createdOP = await orderModel.addOrderProduct(
        5,
        product.id as string,
        order.id as string
      );

      // Fetch id and return it in runtime..
      const fetchedOrderProduct = await orderModel.getAllOrderProducts();
      oProduct.id = fetchedOrderProduct[0].id;

      expect(createdOP).toEqual({ ...oProduct, id: oProduct.id });
    });

    it("-- UpdateOrderProduct method should update orderProduct in the db", async () => {
      const oProduct: Order_product = {
        quantity: 4,
        product_id: product.id,
        order_id: order.id,
      };

      //   const updatedOrderProduct = await orderModel.updateOrderProduct(
      //     4,
      //     product.id,
      //     order.id
      //   );
    });

    it("-- RemoveOrderProduct method should remove orderProduct from the db", async () => {
      const deltedOrderProduct = await orderModel.removeOrderProduct(
        product.id as string,
        order.id as string
      );
    });

    it("-- DeleteOrder method should delete order from DB.", async () => {
      const deletedOrder = await orderModel.delete(order.id as string);

      expect(deletedOrder.id).toBe(order.id);
    });
  });
});
