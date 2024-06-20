import { Router } from 'express';
import {
  getOrderById,
  createOrder,
  createguestOrder,
} from '../services/orderService.js';
import { authenticateToken } from '../middleware/authToken.js';

const ordersRouter = Router();

//ORDER AS USER
ordersRouter.post('/:cartId/', authenticateToken, createOrder);

//ORDER AS GUEST
ordersRouter.post('/:cartId/guest', createguestOrder);

//SHOW ORDER STATUS
ordersRouter.get('/:orderId', getOrderById);

export default ordersRouter;
