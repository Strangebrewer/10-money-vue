import express from 'express';
const router = express.Router();
import isAuthenticated from '../policies/isAuthenticated';
import * as UserController from '../controllers/UserController';

router.get('/', isAuthenticated, UserController.getCurrentUser);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.put('/password', isAuthenticated, UserController.updatePassword)

router.route('/:id')
   .put(isAuthenticated, UserController.put)
   .delete(isAuthenticated, UserController.remove)

export default router;