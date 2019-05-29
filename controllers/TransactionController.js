import Transaction from '../models/Transaction';
import TransactionSchema from '../models/TransactionSchema';
import Account from '../models/Account';
import AccountSchema from '../models/AccountSchema';
const transaction_model = new Transaction(TransactionSchema);
const account_model = new Account(AccountSchema);

export default {

   async index(req, res) {
      try {
         const transactions = await transaction_model.find(req.user.id, req.params);
         res.json(transactions)
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your transaction(s)'
         })
      }
   },

   async post(req, res) {
      try {
         req.body.user = req.user.id;
         const transaction = await TransactionSchema.create(req.body);
         req.body.transaction_id = transaction._id;
         const updated_account = await account_model.calculateNewBalance(req.body)
         // Do I need to return the transaction or the updated account?
         // Figure that out when you build the front end...
         res.json(updated_account);
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while creating your transaction'
         })
      }
   },

   async put(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while updating your transaction'
         })
      }
   },

   async delete(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while deleting your transaction'
         })
      }
   }

}