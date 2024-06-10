import { Router } from 'express';
import {
  registerAdmin,
  registerUser,
  loginUser,
  getUserOrders,
} from '../services/userService.js';
import { validateUser } from '../middleware/validateUser.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { authenticateToken } from '../middleware/authToken.js';

const usersRouter = Router();

//POST /register/admin
usersRouter.post(
  '/register/admin',
  authenticateToken,
  authorizeAdmin,
  validateUser,
  registerAdmin
);

// "POST" /user/register - Funktion för att registrera en ny användare
usersRouter.post('/register', validateUser, registerUser);

// "POST" /user/login - Funktion för att logga in en användare
usersRouter.post('/login', loginUser);

// "POST" /user/logout - Funktion för att logga ut en användare
usersRouter.post('/logout', (req, res) => {
  global.currentUser = null;
  res.status(200).json({ message: 'Logged out successfully' });
});

// "GET" /order visar alla ordrar och total summa
usersRouter.get('/:userId', getUserOrders);

export default usersRouter;
