import { Router } from 'express';
import { registerAdmin } from '../services/adminService.js';

const adminRouter = Router();

//Admin
adminRouter.post('/register', registerAdmin);

export default adminRouter;
