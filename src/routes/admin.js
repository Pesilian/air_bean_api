import { Router } from 'express';
import { adminLogIn } from '../services/adminService.js';

const adminRouter = Router();

//Admin login
adminRouter.post('/', adminLogIn);

export default adminRouter;
