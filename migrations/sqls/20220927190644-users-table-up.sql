/* Replace with your SQL commands */



-- CREATE Id auto Increment Extension 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users' table

CREATE TABLE users (
  -- id SERIAL PRIMARY KEY,
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);