import { Router } from 'express';
import {
  addCart,
  viewCart,
  addToCart,
  removeFromCart,
} from '../services/cartService.js';
import { createOrder, createguestOrder } from '../services/orderService.js';
import { validateCart } from '../middleware/validateCart.js';
import { authenticateToken } from '../middleware/authToken.js';

const cartRouter = Router();

cartRouter.post('/', addCart);

cartRouter.post('/:cartId/items', validateCart, addToCart);

cartRouter.get('/:cartId', viewCart);

cartRouter.delete('/:cartId/items/:itemId', removeFromCart);

cartRouter.post('/:cartId/order', authenticateToken, createOrder);

cartRouter.post('/:cartId/order/guest', createguestOrder);

export default cartRouter;
