import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import CategoryController from '../controllers/CategoryController';

router.route('/')
   .get(passport.authenticate('jwt', { session: false }), CategoryController.index)
   .post(passport.authenticate('jwt', { session: false }), CategoryController.post)

router.route('/:id')
   .get(passport.authenticate('jwt', { session: false }), CategoryController.index)
   .put(passport.authenticate('jwt', { session: false }), CategoryController.put)
   .delete(passport.authenticate('jwt', { session: false }), CategoryController.delete)

export default router;