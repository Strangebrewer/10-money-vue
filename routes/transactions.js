import express from 'express';
const router = express.Router();
import isAuthenticated from '../policies/isAuthenticated';
import TransactionController from '../controllers/TransactionController';

router.route('/')
   .get(isAuthenticated, TransactionController.index)
   .post(isAuthenticated, TransactionController.post)

router.route('/:id')
   .get(isAuthenticated, TransactionController.index)
   .put(isAuthenticated, TransactionController.put)
   .delete(isAuthenticated, TransactionController.delete)

export default router;