import { Router } from 'express';
import {
  getMenu,
  addToMenu,
  removeFromMenu,
  editMenuItem,
} from '../services/menuService.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { authenticateToken } from '../middleware/authToken.js';

const menuRouter = Router();

// "GET"/menu Visar hela menyn

menuRouter.get('/', getMenu);

//Add item to menu - only logged in admin

menuRouter.post('/admin/additem', addToMenu, authorizeAdmin, authenticateToken);

//DELETE item on menu - only logged in admin

menuRouter.delete(
  '/admin/removeitem',
  removeFromMenu,
  authorizeAdmin,
  authenticateToken
);

//Modify item on menu - only logged in admin
menuRouter.patch(
  '/admin/edit/:itemId',
  editMenuItem,
  authorizeAdmin,
  authenticateToken
);

//Add campain menu item

//DELETE campain item

export default menuRouter;
