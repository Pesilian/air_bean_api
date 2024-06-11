import { Router } from 'express';
import {
  newCampaign,
  addCampaignProducts,
  removeCampaign,
} from '../services/campaignService.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { authenticateToken } from '../middleware/authToken.js';
import { validateProduct } from '../middleware/validateProduct.js';

const campaignRouter = Router();

//Add campaign
campaignRouter.post('/', authenticateToken, authorizeAdmin, newCampaign);

//Add campaign
campaignRouter.post(
  '/:campaignTitle',
  authenticateToken,
  authorizeAdmin,
  addCampaignProducts
);

//DELETE campaign
campaignRouter.delete(
  '/:campaignTitle',

  removeCampaign
);

export default campaignRouter;
