import { Router, Request, Response } from "express";
import test_route from "./api/test.route";

const routes = Router();

/** All Routes
 */
routes.get("/", (req: Request, res: Response) => {
  return res.status(200).send(`
  <div>
    <h1>Welcome Ya Man 💪😉</h1>
  </div>
`);
});

routes.use(test_route);

export default routes;
