# API Requirements

## API Endpoints:-

#### Users `/api/user`

- Login (POST `/authenticate`)
- Index `protected with token` (GET `/`)
- Show `protected with token` (GET `/:id`)
- Create (POST `/`)
- Update `protected with token` (PUT `/:id`)
- Delete `protected with token` (DELETE `/:id`)

#### Order `/api/order/`

- Index `protected with token` (GET `/`)
- Show `protected with token` (GET `/:id`)
- Create `protected with token` (POST `/`)
- Update `protected with token` (PUT `/:id`)
- Delete `protected with token` (DELETE `/:id`)

#### Order_Products `/api/order/order_products`

- Add Product to Order `protected with token` (POST `/`)
- Remove Product from Order `protected with token` (POST `/`)
- Delete Product form Order `protected with token` (DELETE `/`)

#### Products `/api/product`

- Index (GET `/` )
- Show (GET `/:id`)
- Create `protected with token` (POST `/`)
- Update `protected with token` (PUT `/:id`)
- Delete `protected with token` (DELETE `/:id`)

## Data Shapes

#### Users:-

The table has the following fields:

- id
- user_name
- first_name
- last_name
- email
- password

The SQL:

```sql
-- Add auto Increment id Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Crate Users' Table

CREATE TABLE users (
  -- id SERIAL PRIMARY KEY,
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  user_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

#### Products:-

The table has the following fields:

- id
- product_name
- product_price
- product_description

The SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  product_price NUMERIC(8,2) NOT NULL,
  product_description VARCHAR(100) NOT NULL
);
```

#### Orders:-

The table has the following fields:

- id
- order_name
- price
- order_status (active or done)
- user_id

The SQL:

```sql
-- Add auto Increment id Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_name VARCHAR(50) NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  order_status VARCHAR(10) NOT NULL CHECK (order_status IN ('active', 'done')),
  user_id uuid REFERENCES users(id)
);
```

#### order_products:-

The table has the following fields:

- id
- quantity
- product_id
- order_id

The SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  quantity INTEGER NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  order_id uuid REFERENCES orders(id) NOT NULL
);
```
