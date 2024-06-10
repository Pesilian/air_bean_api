import { Router } from 'express';
import { companyInfo } from '../config/data.js';

const infoRouter = Router();

// "GET"/about Visar information om företaget

infoRouter.get('/', (req, res) => {
  res.json(companyInfo);
});

export default infoRouter;
