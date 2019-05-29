import express from 'express';
const router = express.Router();
import isAuthenticated from '../policies/isAuthenticated';
import MonthlyController from '../controllers/MonthlyController';

router.route('/')
   .get(isAuthenticated, MonthlyController.index)
   .post(isAuthenticated, MonthlyController.post)

router.route('/:id')
   .get(isAuthenticated, MonthlyController.index)
   .put(isAuthenticated, MonthlyController.put)
   .delete(isAuthenticated, MonthlyController.delete)

export default router;