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
         const transactions = await transaction_model.findle(req.user.id, req.params);
         res.json(transactions)
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting the transaction(s)'
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
            error: 'Something went wrong while creating a transaction'
         })
      }
   },

   async put(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while updating a transaction'
         })
      }
   },

   async delete(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while deleting a transaction'
         })
      }
   }

}