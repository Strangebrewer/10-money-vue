import Monthly from '../models/Monthly';
import MonthlySchema from '../models/MonthlySchema';
import UserSchema from '../models/UserSchema';
import Transaction from '../models/Transaction';
import TransactionSchema from '../models/TransactionSchema';
const monthly_model = new Monthly(MonthlySchema);
const transaction_model = new Transaction(TransactionSchema);
import { addTransactions } from '../lib/ControllerHelpers';

export default {

   async index(req, res) {
      try {
         const response = await monthly_model.find(req.params, req.user.id);
         console.log('response:::', response);

         const transactions_month = await transaction_model.transactionsThisMonth(req.user.id);
         const transactions_30 = await transaction_model.transactionsLast30Days(req.user.id);

         const monthlies = addTransactions(response, 'monthly', transactions_month, transactions_30);
         res.json(monthlies);
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while getting your monthly expense(s)'
         })
      }
   },

   async post(req, res) {
      try {
         const exists = await MonthlySchema.findOne({ name: req.body.name, user: req.user.id });
         if (exists) {
            return res.status(400).send({ error: 'That monthly expense already exists' });
         }
         req.body.user = req.user.id
         const monthly = await MonthlySchema.create(req.body);
         await UserSchema.findByIdAndUpdate(req.user.id, {
            $push: { monthlies: monthly._id }
         });
         res.json(monthly);
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while creating your monthly expense'
         })
      }
   },

   async put(req, res) {
      try {
         const { id } = req.params;
         const monthly = await MonthlySchema.findByIdAndUpdate(id, req.body, { new: true });
         res.json(monthly)
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while updating your monthly expense'
         })
      }
   },

   async delete(req, res) {
      try {
         const response = await MonthlySchema.findByIdAndDelete(req.params.id);
         const monthly = response._id
         const user = await UserSchema.findByIdAndUpdate(req.user.id, {
            $pull: { monthlies: monthly }
         }, { new: true });
         await TransactionSchema.updateMany({ monthly }, { monthly: null });
         res.json(user);
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while deleting your monthly expense'
         })
      }
   }

}