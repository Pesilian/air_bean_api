import { Router } from 'express';
import { menuDb } from '../config/db.js';

const router = Router();

// "GET"/menu Visar hela menyn

router.get('/', (req, res) => {
  res.json(menuDb);
});

//Add item to menu - only logged in admin

//DELETE item on menu - only logged in admin

//Modify item on menu - only logged in admin

//Add campain menu item

//DELETE campain item

export default router;
