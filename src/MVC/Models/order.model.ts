import Order from "../../types/order.types";
// import Order_product from "../../types/order_product.types";
import Error from "./../Interfaces/error";

import queryingDB from "../Middleware/db/queryingDB";

class OrderModel {
  // Get Orders
  async getAllOrders(): Promise<Order[]> {
    try {
      const sql = `SELECT * FROM orders`;

      const result = await queryingDB(sql);
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error at retrieving Orders: ${(error as Error).message}`
      );
    }
  }
  // Get Specific Order
  async getOrder(id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await queryingDB(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't find order: ${id}, ${(error as Error).message}`
      );
    }
  }

  // Create Order
  async create(o: Order): Promise<Order> {
    try {
      const sql = `INSERT INTO orders (order_name, price, order_status, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;

      const result = await queryingDB(sql, [
        o.order_name,
        o.price,
        o.order_status,
        o.user_id,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create order: (${o.id}), ${(error as Error).message} `
      );
    }
  }

  // Update Order
  async update(o: Order): Promise<Order> {
    try {
      const sql = `UPDATE orders
                  SET order_name=$1, price=$2, order_status=$3, user_id=$4
                  WHERE id=($5)
                  RETURNING *`;

      const result = await queryingDB(sql, [
        o.order_name,
        o.price,
        o.order_status,
        o.user_id,
        o.id,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't update Order: ${o.id}, ${(error as Error).message}`
      );
    }
  }

  // Delete Order
  async delete(id: string): Promise<Order> {
    try {
      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;

      const result = await queryingDB(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't delete order: ${id}, ${(error as Error).message}`
      );
    }
  }

  // Add Order_product
  async addOrderProduct(
    quantity: string,
    product_id: string,
    order_id: string
  ): Promise<Order> {
    try {
      const sql = `INSERT INTO order_products 
                  (quantity, product_id, order_id) 
                  VALUES ($1, $2, $3) RETURNING *`;
      const result = await queryingDB(sql, [quantity, product_id, order_id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't add product: ${product_id} to the order: ${order_id}, ${
          (error as Error).message
        }`
      );
    }
  }

  // Update Order_product
  async updateOrderProduct(
    quantity: string,
    product_id: string,
    order_id: string
    //old_product_id,
    //old_order_id
  ): Promise<Order> {
    try {
      const sql = `UPDATE TABLE  order_products
                  SET quantity=$1, product_id=$2, order_id=$3
                  WHERE product_id=($4) AND order_id=($5)
                  RETURNING *`;
      const result = await queryingDB(sql, [
        quantity,
        product_id,
        order_id,
        //old_product_id,
        //old_order_id
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't update product: ${product_id} from order: ${order_id}, ${
          (error as Error).message
        }`
      );
    }
  }

  // Remove Order_product
  async removeOrderProduct(
    product_id: string,
    order_id: string
  ): Promise<Order> {
    try {
      const sql = `DELETE FORM order_products
                  WHERE product_id=$1 AND order_id=$2`;
      const result = await queryingDB(sql, [product_id, order_id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't remove product: ${product_id} from order: ${order_id}, ${
          (error as Error).message
        }`
      );
    }
  }
}

export default OrderModel;
