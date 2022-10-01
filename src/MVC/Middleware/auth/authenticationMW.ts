import { Request, Response, NextFunction } from "express";
import * as Jwt from "jsonwebtoken";

import Error from "./../../Interfaces/error";
import { JWT_SECRET_TOKEN } from "../../../config";

const handelUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error(
    "Not Authorized, Login Error: Please Try again"
  );

  error.status = 401;
  next(error);
};

const validationMW = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    // No token provided
    if (!authHeader) handelUnauthorizedError(next);

    /** Check if the token is bearer type or not
     */
    const bearer = (authHeader as string).split(" ")[0].toLowerCase();
    const token = (authHeader as string).split(" ")[1];

    if (token && bearer === "bearer") {
      const decodedToken = Jwt.verify(
        token,
        JWT_SECRET_TOKEN as unknown as string
      );

      // req.id = decodedToken.data.id;

      if (decodedToken) {
        next();
      } else {
        // Failed to authenticate user
      }
    } else {
      // token type not bearer
      handelUnauthorizedError(next);
    }
  } catch (error) {
    handelUnauthorizedError(next);
  }
};

export default validationMW;
