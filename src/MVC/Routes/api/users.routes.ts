import { Router } from "express";

import {
  createUser,
  getMany,
  getOne,
  updateOne,
  deleteOne,
} from "../../Controllers/users.controllers";

const users_route = Router();

/** Test DB Connection
 */
users_route.route("/db").post(createUser).get(getMany).patch(updateOne);

users_route.route("/db/:id").get(getOne).delete(deleteOne);

export default users_route;
