import { Router } from 'express';
import { getMenu, addToMenu, removeFromMenu } from '../services/menuService.js';

const menuRouter = Router();

// "GET"/menu Visar hela menyn

menuRouter.get('/', getMenu);

//Add item to menu - only logged in admin

menuRouter.post('/admin/additem', addToMenu);

//DELETE item on menu - only logged in admin

menuRouter.delete('/admin/removeitem', removeFromMenu);

//Modify item on menu - only logged in admin

//Add campain menu item

//DELETE campain item

export default menuRouter;
