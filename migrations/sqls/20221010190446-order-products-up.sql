/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity INTEGER NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  order_id uuid REFERENCES orders(id) NOT NULL
);