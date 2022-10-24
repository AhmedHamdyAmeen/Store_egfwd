import { Router } from "express";

import AuthenticationMW from "../../Middleware/auth/authenticationMW";

/** Order Controllers:
 */

import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addOrderProduct,
  updateOrderProduct,
  removeOrderProduct,
} from "../../Controllers/orders.controllers";

/** ----------------------- **
 *  Order Routes:
 */
const orders_route = Router();

// Authentication ==> Authorization ==> Validation Array ==> Request Validation ==> Controller
orders_route
  .route("/order")
  .get(getAllOrders)
  .post(AuthenticationMW, createOrder)
  .put(AuthenticationMW, updateOrder);

orders_route
  .route("/order/order_products")
  .post(AuthenticationMW, addOrderProduct)
  .put(AuthenticationMW, updateOrderProduct)
  .delete(AuthenticationMW, removeOrderProduct);

orders_route
  .route("/order/:id")
  .get(getOrder)
  .delete(AuthenticationMW, deleteOrder);

export default orders_route;
