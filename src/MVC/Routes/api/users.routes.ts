import { Router } from "express";

import validationMW from "../../Middleware/auth/authenticationMW";

import {
  createUser,
  getMany,
  getOne,
  updateOne,
  deleteOne,
  authenticate,
} from "../../Controllers/users.controllers";

const users_route = Router();

/** Test DB Connection
 */
users_route
  .route("/db")
  .post(createUser)
  .get(validationMW, getMany)
  .patch(validationMW, updateOne);

users_route.route("/db/:id").get(getOne).delete(deleteOne);

users_route.route("/authenticate").post(authenticate);

export default users_route;
