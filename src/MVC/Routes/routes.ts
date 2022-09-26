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

routes.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(200).json({ msg: "Hello Ya Man 😥💔", data: req.body });
});

routes.use(test_route);

export default routes;
