/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  product_price NUMERIC(8,2) NOT NULL,
  product_description VARCHAR(100) NOT NULL
);
