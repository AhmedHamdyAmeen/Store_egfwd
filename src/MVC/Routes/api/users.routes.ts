import { Router } from "express";

import AuthenticationMW from "../../Middleware/auth/authenticationMW";

/** User Controllers:
 */
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  authenticate,
} from "../../Controllers/users.controllers";

/** ----------------------- **
 * User Routes
 */
const users_route = Router();

users_route
  .route("/user")
  .post(createUser)
  .get(AuthenticationMW, getAllUsers)
  .patch(AuthenticationMW, updateUser);

users_route.route("/user/authenticate").post(authenticate);

users_route.route("/user/:id").get(getUser).delete(deleteUser);
export default users_route;
