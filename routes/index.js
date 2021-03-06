import express from 'express';
import path from 'path';
const router = express.Router();

import base_routes from './base';
import user_routes from './users';

router.use('/accounts', addUrlToReqBody, base_routes);
router.use('/categories', addUrlToReqBody, base_routes);
router.use('/monthlies', addUrlToReqBody, base_routes);
router.use('/transactions', addUrlToReqBody, base_routes);
router.use('/users', user_routes);


router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

function addUrlToReqBody(req, res, next) {
   req.body.url = req.baseUrl.replace('/', '');
   next();
}

export default router;