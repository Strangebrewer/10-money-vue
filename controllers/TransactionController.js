import Transaction from '../models/Transaction';
import TransactionSchema from '../models/TransactionSchema';
const transaction_model = new Transaction(TransactionSchema);

export default {

   async index(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your transaction(s)'
         })
      }
   },

   async post(req, res) {
      try {

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