import { Router } from 'express';
import {
  getMenu,
  addToMenu,
  removeFromMenu,
  editMenuItem,
} from '../services/menuService.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { authenticateToken } from '../middleware/authToken.js';
import { validateProduct } from '../middleware/validateProduct.js';

const menuRouter = Router();

// "GET"/menu Visar hela menyn

menuRouter.get('/', getMenu);

//Add item to menu - only logged in admin

menuRouter.post(
  '/admin/additem',
  authenticateToken,
  authorizeAdmin,
  validateProduct,
  addToMenu
);

//DELETE item on menu - only logged in admin

menuRouter.delete(
  '/admin/removeitem',
  authenticateToken,
  authorizeAdmin,
  removeFromMenu
);

//Modify item on menu - only logged in admin
menuRouter.patch(
  '/admin/edit/:itemId',
  authenticateToken,
  authorizeAdmin,
  editMenuItem
);

//Add campain menu item

//DELETE campain item

export default menuRouter;
