import { Router } from 'express';
import { registerAdmin, adminLogIn } from '../services/adminService.js';

const adminRouter = Router();

//Admin
adminRouter.post('/register', registerAdmin);

//admin login
adminRouter.post('/login', adminLogIn);

export default adminRouter;
