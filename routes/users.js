import express from 'express';
const router = express.Router();
import { passport } from '../passport';
import UserController from '../controllers/UserController';

router.get('/', passport.authenticate('jwt', { session: false }), UserController.getCurrentUser);

router.get('/register', UserController.register);

router.post('/login', UserController.login);

export default router;