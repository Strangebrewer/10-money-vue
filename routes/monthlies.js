import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import MonthlyController from '../controllers/MonthlyController';

router.route('/')
   .get(passport.authenticate('jwt', { session: false }), MonthlyController.index)
   .post(passport.authenticate('jwt', { session: false }), MonthlyController.post)

router.route('/:id')
   .get(passport.authenticate('jwt', { session: false }), MonthlyController.index)
   .put(passport.authenticate('jwt', { session: false }), MonthlyController.put)
   .delete(passport.authenticate('jwt', { session: false }), MonthlyController.delete)

export default router;