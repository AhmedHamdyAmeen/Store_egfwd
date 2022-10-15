import { Router, Request, Response } from "express";

import users_route from "./api/users.routes";
import orders_route from "./api/orders.routes";
import products_route from "./api/products.routes";

const routes = Router();

/** All Routes
 */
routes.get("/", (_req: Request, res: Response) => {
  return res.status(200).send(`
  <div>
    <h1>Welcome Ya Man 💪😉</h1>
  </div>
`);
});

routes.use(users_route);
routes.use(products_route);
routes.use(orders_route);

export default routes;
