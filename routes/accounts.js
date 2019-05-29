import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import AccountController from '../controllers/AccountController';

router.route('/')
   .get(passport.authenticate('jwt', { session: false }), AccountController.index)
   .post(passport.authenticate('jwt', { session: false }), AccountController.post)

router.route('/:id')
   .get(passport.authenticate('jwt', { session: false }), AccountController.index)
   .put(passport.authenticate('jwt', { session: false }), AccountController.put)
   .delete(passport.authenticate('jwt', { session: false }), AccountController.delete)

export default router;