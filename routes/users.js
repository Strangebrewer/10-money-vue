import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import * as UserController from '../controllers/UserController';

router.get('/', passport.authenticate('jwt', { session: false }), UserController.getCurrentUser);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

export default router;