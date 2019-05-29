import express from 'express';
const router = express.Router();
import isAuthenticated from '../policies/isAuthenticated';
import CategoryController from '../controllers/CategoryController';

router.route('/')
   .get(isAuthenticated, CategoryController.index)
   .post(isAuthenticated, CategoryController.post)

router.route('/:id')
   .get(isAuthenticated, CategoryController.index)
   .put(isAuthenticated, CategoryController.put)
   .delete(isAuthenticated, CategoryController.delete)

export default router;