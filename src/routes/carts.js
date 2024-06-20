import { Router } from 'express';
import {
  newCart,
  viewCart,
  addToCart,
  removeFromCart,
} from '../services/cartService.js';
import { validateCart } from '../middleware/validateCart.js';

const cartRouter = Router();

//POST - /carts/  -skapar upp en kundvagn
cartRouter.post('/', newCart);

//POST - /carts/:cartId -Lägg till varor i kundvagn
cartRouter.post('/:cartId/items', validateCart, addToCart);

//POST - /carts/:cartId -Visa kundvagn
cartRouter.get('/:cartId', viewCart);

//POST -/carts/:cartId -Ta bort vara från kundvagn // TODO: kommentarer som inte är aktuella längre.
cartRouter.delete('/:cartId/items/:itemId', removeFromCart);

export default cartRouter;
