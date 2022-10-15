import { Router } from "express";

import AuthenticationMW from "../../Middleware/auth/authenticationMW";

/** Order Controllers:
 */
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../Controllers/products.controllers";

/** ----------------------- **
 *  Order Routes:
 */
const products_route = Router();

products_route
  .route("/product")
  .get(getAllProducts)
  .post(AuthenticationMW, createProduct)
  .put(AuthenticationMW, updateProduct);

products_route
  .route("/product/:id")
  .get(getProduct)
  .delete(AuthenticationMW, deleteProduct);

export default products_route;
