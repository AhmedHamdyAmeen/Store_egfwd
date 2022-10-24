# Storefront Backend

## Description

This is the second project in the [egFWD](https://egfwd.com/) initiative (Full Stack JavaScript Nanodegree).
It is a backend of Web Store.

## Prerequisites

You must have install on your machine:

- [Node](https://nodejs.org/en/download/) v16.13.1 or higher.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v8.1.2 or higher.
- [PostgreSQL](https://www.postgresql.org/download/) v14.5 or higher.

## Instructions

### Installation

You can follow the below steps:

1. Clone the Repo.

```sh
   git clone https://github.com/AhmedHamdyAmeen/Store_egfwd.git
```

2. Install NPM Packages.

```sh
npm i
```

3. Open the **psql shell** on your machine and apply its default configurations  
   create your user with **_superuser privileges_** and create the two databases for development and testing purposes

```sh
CREATE USER store_admin WITH PASSWORD 'admin@1234' SUPERUSER;
```

```sh
CREATE DATABASE store_dev OWNER store_admin ENCODING UTF8;

CREATE DATABASE store_test OWNER store_admin ENCODING UTF8;
```

3. Rename ".env_Example" file with ".env" and change the database infos and the other secret infos

```bash

PORT=5050
HOST=localhost
NODE_ENV=dev


# Database Config:
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_test=store_test
POSTGRES_USER=store_admin
POSTGRES_PASSWORD=admin@1234


# bCrypt Hashing
BCRYPT_PASSWORD=Your_PasWorDHeRE
BCRYPT_SALT=10

# JWT
JWT_SECRET_TOKEN=Your_PasWorDHeRE

```

4. Run **db-migrate** to setup your database **on port 5432 as declared in .env**

```sh
db-migrate up
```

5. Run the Project on **localhost:5050**

```sh
yarn dev
```

- Then open your browser and go to `http://localhost:5050/api` or with the written port in your .env file.

## Scripts

- Starting the development environment

  ```sh
  yarn dev
  ```

- Building Project

  ```sh
  yarn build
  ```

- Start the Builded Project: production environment

  ```sh
  yarn start
  ```

- Formatting the project with **ESlint**

  ```sh
  yarn lint
  ```

- Formatting the project with **ESlint** and fix issues

  ```sh
  yarn lint:f
  ```

- Formatting the project with **Prettier** and **ESlint**

  ```sh
  yarn format
  ```

- Testing the project with **_Jasmine_** on **Mac OP**

  ```sh
  yarn test:mac
  ```

- Testing the project with **_Jasmine_** on **Windows OP**

  ```sh
  yarn test:windows
  ```

- Testing Builded project with **_Jasmine_**

  ```sh
  yarn test
  ```

- For running up the migrations

  ```sh
  yarn migration:run
  ```

- For running down the migrations

  ```sh
  yarn migration:down
  ```

- For running rest the migrations

  ```sh
  yarn migration:rest
  ```

- For creating migration file

  ```sh
  yarn migration:create
  ```

## API Documentation

1- User:

    - You can add new User
    example:
    (POST) http://localhost:5050/api/user

    Body:

```json
{
  "email": "Yaas@g.com",
  "user_name": "Yasmina Salah",
  "first_name": "Yasmina",
  "last_name": "Salah",
  "password": "password"
}
```

    - You can login using user email and password
    ex:
    (post) http://localhost:5050/api/user/authenticate
    it will returns the access login

    Body:

```json
{
  "email": "Yas@g.com",
  "password": "password"
}
```

    - You can update user infos
    ex:
    (patch) http://localhost:5050/api/user

    Body:

```json
{
  "id": "7088e987-2262-467b-9d3b-18457c2583a6",
  "email": "Saas@g.com",
  "user_name": "Samir Salah",
  "first_name": "Samir",
  "last_name": "Salah",
  "password": "password"
}
```

    - You can show user by id with authorization token
    example:
    (GET) http://localhost:5050/api/user/{user_id}
    will return the user with id (user_id)

    - You can show all users with authorization token
    example:
    (GET) http://localhost:5050/api/user
    will return all users

    -- You can delete user by id with authorization token
    (delete) http://localhost:5050/api/user/{user_id}

2- Product:

    ** You can add new Product
    example:
    (POST) http://localhost:5050/api/product with authorization token
    will return the new added product
    Body:

```json
{
  "product_name": "IPhone 20",
  "product_price": 499,
  "product_description": "Good Description"
}
```

    ** You can show Product by id
    example:
    (GET) http://localhost:5050/api/product/{product_id}
    will return the product with id (product_id)

    ** You can show all Products
    example:
    (GET) http://localhost:5050/api/product
    will return all products

    ** You can Update product by id with authorization token
    ex:
    (put) http://localhost:5050/api/product

```json
{
  "product_name": "IPhone 20",
  "product_price": 499,
  "product_description": "Good Description",
  "id": "2decd67c-4034-4fd4-a6d4-ab5038e5b31d"
}
```

    ** You can delete product by id with authorization token
    ex:
    (delete) http://localhost:5050/api/product/{product_id}

3- Order:

    - You can add new order with authorization token
    example:
    (POST) http://localhost:5050/api/order with authorization token
    will return the new added order

    Body:

```json
{
  "order_name": "New Office Keyboard for CashCall company",
  "price": 352,
  "order_status": "active",
  "user_id": "b8365212-8cfa-4a93-b790-8a258c92eac6"
}
```

    - You can show all orders
    ex:
    (get) http://localhost:5050/api/order
    will return all orders

    -- You can show specific order by {order_id}
    ex:
    (get) http://localhost:5050/api/order/{order_id}

    -- You can Update order by id with authorization token
       (put) http://localhost:5050/api/order with authorization token

    Body:

```json
{
  "id": "ccc963da-f3ad-4f9a-9d98-2617685a4351",
  "order_name": "New Office Keyboard for CashCall company",
  "price": 352,
  "order_status": "done",
  "user_id": "b8365212-8cfa-4a93-b790-8a258c92eac6"
}
```

    - You delete order by {order_id} with authorization token
    ex:
    (delete) http://localhost:5050/api/order/{order_id}

## Data Schema

#### Product

- id
- product_name
- product_price
- product_description

#### User

- id
- email
- user_name
- first_name
- last_name
- password

#### Orders

- id
- order_name
- price
- order_status (active or done)
- user_id
- id of each product in the order
- quantity of each product in the order
