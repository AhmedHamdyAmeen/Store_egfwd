/* Replace with your SQL commands */

-- Add auto Increment id Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_name VARCHAR(50) NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  order_status VARCHAR(10) NOT NULL CHECK (order_status IN ('active', 'done')),
  user_id uuid REFERENCES users(id)
);

