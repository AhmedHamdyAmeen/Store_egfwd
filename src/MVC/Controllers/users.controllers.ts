import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { JWT_SECRET_TOKEN } from "../../config";

/** Models:
 */
import UserModel from "../Models/user.model";

/** Instantiate instance from UserModel Class
 */
const userModel = new UserModel();

/** ---------------------- **
 * Controller Functions:
 */

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body);

    res.status(200).json({ msg: "User Added Successfully", data: { ...user } });
    // res.send("Allah with me 💪😉");
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getAllUsers();

    res
      .status(200)
      .json({ msg: "Users Retrieved Successfully", data: { ...users } });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getUser(req.params.id as unknown as string);
    res
      .status(200)
      .json({ msg: "User retrieved Successfully", data: { ...user } });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateUser(req.body);
    res
      .status(200)
      .json({ msg: "User updated Successfully", data: { ...user } });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string);
    res
      .status(200)
      .json({ msg: "User Deleted Successfully", data: { ...user } });
  } catch (error) {
    next(error);
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.authenticate(email, password);
    if (!user) {
      return res.status(401).json({
        status: "error",
        msg: "The User name and Password don't match, please try agin",
      });
    }

    // Generate Token
    const token = jwt.sign({ user }, JWT_SECRET_TOKEN as unknown as string, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      status: "success",
      data: { ...user },
      token,
      msg: "User authenticated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  authenticate,
};
