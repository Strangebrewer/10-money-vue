import Account from '../models/Account';
import AccountSchema from '../models/AccountSchema';
import UserSchema from '../models/UserSchema';
const account_model = new Account(AccountSchema);

export default {

   async index(req, res) {
      try {
         const accounts = await account_model.find(req.params, req.user.id)
         res.json(accounts);
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your account(s)'
         })
      }
   },

   async post(req, res) {
      try {
         req.body.user = req.user.id;
         const account = await AccountSchema.create(req.body);
         await UserSchema.findByIdAndUpdate(req.user.id, {
            $push: { accounts: account._id }
         })
         res.json(account);
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while creating your account'
         })
      }
   },

   async put(req, res) {
      try {
         const account = await AccountSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
         console.log('account in Controller:::', account);
         res.json(account);
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