import Transaction from '../models/Transaction';
import TransactionSchema from '../models/TransactionSchema';
import Account from '../models/Account';
import AccountSchema from '../models/AccountSchema';
import Category from '../models/Category';
import CategorySchema from '../models/CategorySchema';
const transaction_model = new Transaction(TransactionSchema);
const account_model = new Account(AccountSchema);
// const category_model = new Category(CategorySchema);

export default {

   async index(req, res) {
      try {
         const transactions = await transaction_model.find(req.user.id, req.params);
         res.json(transactions)
      } catch (e) {
         res.status(500).send({
            error: e.message
         })
      }
   },

   async post(req, res) {
      try {
         req.body.user = req.user.id;
         const transaction = await TransactionSchema.create(req.body);
         req.body.transaction_id = transaction._id;
         const account = await account_model.calculateNewBalance(req.body);
         res.send({ account, transaction });
      } catch (e) {
         res.status(500).send({
            error: e.message
         })
      }
   },

   async put(req, res) {
      try {
         const transaction = await TransactionSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
         res.json(transaction);
      } catch (e) {
         res.status(500).send({
            error: e.message
         })
      }
   },

   async delete(req, res) {
      try {
         const transaction = await TransactionSchema.findByIdAndDelete(req.params.id);
         const account = await account_model.calculatePreviousBalance(transaction);
         res.json(account);
      } catch (e) {
         res.status(500).send({
            error: e.message
         })
      }
   }

}