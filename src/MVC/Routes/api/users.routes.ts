import { Router } from "express";

import AuthenticationMW from "../../Middleware/auth/authenticationMW";

/** User Controllers:
 */
import {
  createUser,
  getMany,
  getOne,
  updateOne,
  deleteOne,
  authenticate,
} from "../../Controllers/users.controllers";

/** ----------------------- **
 * Test DB Connection
 * ! User Routes
 */
const users_route = Router();

users_route
  .route("/db")
  .post(createUser)
  .get(AuthenticationMW, getMany)
  .patch(AuthenticationMW, updateOne);

users_route.route("/db/:id").get(getOne).delete(deleteOne);

users_route.route("/authenticate").post(authenticate);

export default users_route;
