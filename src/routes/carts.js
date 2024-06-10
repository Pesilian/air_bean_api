import { Router } from 'express';
import {
  newCart,
  viewCart,
  addToCart,
  removeFromCart,
} from '../services/cartService.js';
import { createOrder, createguestOrder } from '../services/orderService.js';
import { validateCart } from '../middleware/validateCart.js';
import { authenticateToken } from '../middleware/authToken.js';

const cartRouter = Router();

//POST - /carts/  -skapar upp en kundvagn
cartRouter.post('/', newCart);

//POST - /carts/:cartId -Lägg till varor i kundvagn
cartRouter.post('/:cartId/', validateCart, addToCart);

//POST - /carts/:cartId -Visa kundvagn
cartRouter.get('/:cartId', viewCart);

//POST -/carts/:cartId -Ta bort vara från kundvagn
cartRouter.delete('/:cartId/items', removeFromCart);

export default cartRouter;
