import { Response, Request, NextFunction } from "express";

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

const getMany = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getMany();

    res
      .status(200)
      .json({ msg: "Users Retrieved Successfully", data: { ...users } });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res
      .status(200)
      .json({ msg: "User retrieved Successfully", data: { ...user } });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateOne(req.body);
    res
      .status(200)
      .json({ msg: "User updated Successfully", data: { ...user } });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res
      .status(200)
      .json({ msg: "User Deleted Successfully", data: { ...user } });
  } catch (error) {
    next(error);
  }
};

export { createUser, getMany, getOne, updateOne, deleteOne };
