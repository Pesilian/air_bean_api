import { Router } from 'express';
import {
  addCart,
  viewCart,
  addToCart,
  removeFromCart,
} from '../services/cartService.js';
import { validateCart } from '../middleware/validateCart.js';

const cartRouter = Router();

cartRouter.post('/', addCart);

cartRouter.post('/:cartId/items', validateCart, addToCart);

cartRouter.get('/:cartId', viewCart);

cartRouter.delete('/:cartId/items/:itemId', removeFromCart);

export default cartRouter;
