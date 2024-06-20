import { Router } from 'express';
import {
  getProducts,
  addProducts,
  removeProducts,
  editProducts,
} from '../services/productsService.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { authenticateToken } from '../middleware/authToken.js';
import { validateProduct } from '../middleware/validateProduct.js';

const productsRouter = Router();

// "GET"/products/ Visar hela produktmenyn
productsRouter.get('/', getProducts);

//Add item to menu - only logged in admin
productsRouter.post(
  '/',
  authenticateToken,
  authorizeAdmin,
  validateProduct,
  addProducts
);

//DELETE item on menu - only logged in admin

productsRouter.delete(
  '/:itemId',
  authenticateToken,
  authorizeAdmin,
  removeProducts
);

//Modify item on menu - only logged in admin
productsRouter.patch(
  '/:itemId',
  authenticateToken,
  authorizeAdmin,
  editProducts
);

export default productsRouter;
