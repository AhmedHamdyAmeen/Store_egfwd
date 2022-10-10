import { Router, Request, Response } from "express";


import users_route from "./api/users.routes";

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

export default routes;
