import { Router, Response, Request } from "express";

const test_route = Router();

test_route.route("/api").get((req: Request, res: Response) => {
  res.status(200).json({ msg: "Allah With me 💪😍" });
});

export default test_route;
