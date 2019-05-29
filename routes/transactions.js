import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import TransactionController from '../controllers/TransactionController';

router.route('/')
   .get(passport.authenticate('jwt', { session: false }), TransactionController.index)
   .post(passport.authenticate('jwt', { session: false }), TransactionController.post)

router.route('/:id')
   .get(passport.authenticate('jwt', { session: false }), TransactionController.index)
   .put(passport.authenticate('jwt', { session: false }), TransactionController.put)
   .delete(passport.authenticate('jwt', { session: false }), TransactionController.delete)

export default router;