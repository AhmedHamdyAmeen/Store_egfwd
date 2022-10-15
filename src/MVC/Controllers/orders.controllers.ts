import { Request, Response, NextFunction } from "express";

/** Models:
 */
import OrderModel from "../Models/order.model";

/** Instantiate instance from OrderModel Class:
 */
const orderModel = new OrderModel();

/** ---------------------- **
 * Controller Functions:
 */

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdOrder = await orderModel.create(req.body);

    res.status(200).json({
      msg: `Order: (${req.body.order_name as string}) created Successfully`,
      data: { ...createdOrder },
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getOrder(req.params.id as string);

    res.status(200).json({
      msg: `Order ${req.params.id as string} retrieved successfully`,
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.getAllOrders();

    res
      .status(200)
      .json({ msg: "Orders Retrieved Successfully", data: { ...orders } });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedOrder = await orderModel.update({ ...req.body });

    // console.log("updatedOrder", updatedOrder);

    if (!updatedOrder)
      throw new Error(`Order: (${req.body.id as string}) Not Found`);

    res.status(200).json({
      msg: `Order: (${req.body.id as string}) Updated Successfully`,
      data: { ...updatedOrder },
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedOrder = await orderModel.delete(req.params.id as string);

    res.status(200).json({
      msg: `Order: (${req.params.id as string}) Deleted Successfully`,
      data: { ...deletedOrder },
    });
  } catch (error) {
    next(error);
  }
};

const addOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProducts = await orderModel.addOrderProduct(
      req.body.quantity,
      req.body.product_id,
      req.body.order_id
    );

    res.status(200).json({
      msg: `Product: (${req.body.product_id as string}) add to Order: (${
        req.body.order_id as string
      }) Successfully`,
      data: { ...orderProducts },
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedOrderProducts = await orderModel.updateOrderProduct(
      req.body.quantity,
      req.body.product_id,
      req.body.order_id,
      req.body.old_product_id,
      req.body.old_order_id
    );

    if (!updatedOrderProducts)
      throw new Error(
        `Product: (${req.body.product_id as string}) & Order: (${
          req.body.order_id as string
        }) Not Found!`
      );

    res.status(200).json({
      msg: `Product: (${req.body.product_id as string}) in Order: (${
        req.body.order_id as string
      }) Updated Successfully`,
      data: { ...updatedOrderProducts },
    });
  } catch (error) {
    next(error);
  }
};

const removeOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const removedOrderProduct = await orderModel.removeOrderProduct(
      req.body.product_id,
      req.body.order_id
    );
    
    console.log("removeOrderProduct work=========>", removedOrderProduct);

    res.status(200).json({
      msg: `Product: (${req.body.product_id as string}) in Order: (${
        req.body.order_id as string
      }) Deleted Successfully`,
      data: { ...removedOrderProduct },
    });
  } catch (error) {
    next(error);
  }
};

export {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addOrderProduct,
  updateOrderProduct,
  removeOrderProduct,
};
