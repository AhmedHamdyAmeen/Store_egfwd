import Product from "../../types/product.types";
import Error from "../Interfaces/error";

import queryingDB from "../Middleware/db/queryingDB";

class ProductModel {
  // Get Products
  async getAllProducts(): Promise<Product[]> {
    try {
      const sql = `SELECT * FORM products`;
      const result = await queryingDB(sql);
      return result.rows;
    } catch (error) {
      throw new Error(
        `Couldn't retrieve Products: ${(error as Error).message}`
      );
    }
  }

  // Get Specific Product
  async getProduct(id: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FORM products WHERE id=($1)`;
      const result = await queryingDB(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error(
        `Couldn't retrieve Product: ${id}, ${(error as Error).message}`
      );
    }
  }

  // Create Product
  async create(p: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO Products
                  (product_name, product_price, product_description)
                  VALUES ($1, $2, $3) RETURNING *`;

      const result = await queryingDB(sql, [
        p.product_name,
        p.product_price,
        p.product_description,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create Product: (${p.id}), ${(error as Error).message} `
      );
    }
  }

  // Update Product
  async update(p: Product): Promise<Product> {
    try {
      const sql = `UPDATE products
                  SET product_name=$1, product_price=$2, product_description=$3
                  WHERE id=($4)
                  RETURNING *`;

      const result = await queryingDB(sql, [
        p.product_name,
        p.product_price,
        p.product_description,
        p.id,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't update Product: ${p.id}, ${(error as Error).message}`
      );
    }
  }

  // Remove Product
  async delete(id: string): Promise<Product> {
    try {
      const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
      const result = await queryingDB(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't delete products: ${id}, ${(error as Error).message}`
      );
    }
  }
}

export default ProductModel;
