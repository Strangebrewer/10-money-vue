import express from 'express';
const router = express.Router();
import isAuthenticated from '../policies/isAuthenticated';
import AccountController from '../controllers/AccountController';

router.route('/')
   .get(isAuthenticated, AccountController.index)
   .post(isAuthenticated, AccountController.post);

router.route('/:id')
   .get(isAuthenticated, AccountController.index)
   .put(isAuthenticated, AccountController.put)
   .delete(isAuthenticated, AccountController.delete);

export default router;