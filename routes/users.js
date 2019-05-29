import express from 'express';
const router = express.Router();
import isAuthenticated from '../policies/isAuthenticated';
import * as UserController from '../controllers/UserController';

router.get('/', isAuthenticated, UserController.getCurrentUser);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

export default router;