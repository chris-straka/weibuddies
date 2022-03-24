import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError, NotAuthorizedError } from '@weibuddies/common';
import { ProductCreatedPublisher } from '../events/publishers/ProductCreatedPublisher';
import { producer } from '../kafka
import { productDb } from '../models/Product';
import { ProductUpdatedPublisher } from '../events/publishers/ProductUpdatedPublisher';

const ITEMS_PER_PAGE = 10;

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product = await productDb.getProduct(productId);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.query;
    if (!page) throw new Error("Couldn't find the page number");
    const lowerBound = +page * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const upperBound = +page * ITEMS_PER_PAGE;
    const products = await productDb.getProductsFromLowerToUpper(
      lowerBound.toString(),
      upperBound.toString(),
    );
    if (!products) throw new NotFoundError();

    return res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) throw new Error('Not logged in');

    const { title, price } = req.body;
    const { userId } = req.session.jwt;
    const product = await productDb.createProduct(title, price, userId);

    new ProductCreatedPublisher(producer).publish({
      id: product.id,
      version: product.version,
      title: product.title,
      price: product.price,
      userId: product.userId,
    });

    return res.status(201).send(product);
  } catch (error) {
    return next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const { currentUser } = req;
    if (!currentUser) throw new Error('User is not signed in');

    const product = await productDb.getProduct(productId);

    if (!product) throw new NotFoundError();
    if (product.orderId) throw new BadRequestError('[Orders] Cannot edit a reserved product');
    if (product.userId !== currentUser.id) throw new NotAuthorizedError();

    productDb.updateProduct(req.body.title, req.body.price);

    new ProductUpdatedPublisher(producer).publish({
      id: product.id,
      version: product.version,
      title: product.title,
      price: product.price,
      userId: product.userId,
    });

    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
};
