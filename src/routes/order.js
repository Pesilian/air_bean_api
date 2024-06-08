import { Router } from 'express';
import { getUserOrders } from '../services/orderService.js';
import { getOrderById } from '../services/statusService.js';

const orderRouter = Router();

// "GET" /order visar alla ordrar och total summa
orderRouter.get('/user/:userId', getUserOrders);

// "GET" /order/:orderId visar status sidan för en specifik order
orderRouter.get('/:orderId', getOrderById);

export default orderRouter;
