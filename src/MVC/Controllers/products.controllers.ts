import { Request, Response, NextFunction } from "express";

/** Models:
 */

import ProductModel from "./../Models/product.model";

/** Instantiate instance from OrderModel Class:
 */
const productModel = new ProductModel();

/** ---------------------- **
 * Controller Functions:
 */

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdProduct = await productModel.createProduct(req.body);
    res.status(200).json({
      msg: `Product: (${req.body.product_name as string}) created Successfully`,
      data: { ...createdProduct },
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json({
      msg: `Products retrieved Successfully`,
      data: { ...products },
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getProduct(req.params.id as string);

    if (!product.length)
      throw new Error(`Product: ${req.params.id} not found!`);

    res.status(200).json({
      msg: `Product: (${req.params.id as string}) Retrieved Successfully`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProduct = await productModel.updateProduct({ ...req.body });

    // console.log("updatedProduct", updatedProduct);

    if (!updatedProduct)
      throw new Error(
        `Failed to Updated Product: (${req.body.product_name as string})`
      );

    res.status(200).json({
      msg: `Product: (${req.body.product_name as string}) Updated Successfully`,
      data: { ...updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProduct = await productModel.deleteProduct(
      req.params.id as string
    );
    res.status(200).json({
      msg: `Product: (${req.params.id as string}) Deleted Successfully`,
      data: { ...deletedProduct },
    });
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
