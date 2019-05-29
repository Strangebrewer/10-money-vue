import Account from '../models/Account';
import AccountSchema from '../models/AccountSchema';
const account_model = new Account(AccountSchema);

export default {

   async index(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your account(s)'
         })
      }
   },

   async post(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while creating your account'
         })
      }
   },

   async put(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while updating your account'
         })
      }
   },

   async delete(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while deleting your account'
         })
      }
   }

}