import express from 'express';
const router = express.Router();
import user_routes from './users';
import transaction_routes from './transactions';
import category_routes from './categories';
import account_routes from './accounts';
import monthly_routes from './monthlies';

router.use('/users', user_routes);
router.use('/transactions', transaction_routes);
router.use('/categories', category_routes);
router.use('/monthlies', monthly_routes);
router.use('/accounts', account_routes);

export default router;