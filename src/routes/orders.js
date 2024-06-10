import { Router } from 'express';
import {
  getOrderById,
  createOrder,
  createguestOrder,
} from '../services/orderService.js';
import { authenticateToken } from '../middleware/authToken.js';

const ordersRouter = Router();

//
ordersRouter.post('/:cartId/', authenticateToken, createOrder);

ordersRouter.post('/:cartId/guest', createguestOrder);

// "GET" /order/:orderId visar status sidan för en specifik order
ordersRouter.get('/:orderId', getOrderById);

export default ordersRouter;
