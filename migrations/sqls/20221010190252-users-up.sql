/* Replace with your SQL commands */


-- Add auto Increment id Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Crate Users' Table

CREATE TABLE users (
  -- id SERIAL PRIMARY KEY,
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);
