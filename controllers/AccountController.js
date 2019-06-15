import Account from '../models/Account';
import AccountSchema from '../models/AccountSchema';
import TransactionSchema from '../models/TransactionSchema';
import UserSchema from '../models/UserSchema';
const account_model = new Account(AccountSchema);

export default {

   async index(req, res) {
      try {
         const accounts = await account_model.find(req.params, req.user.id)
         res.json(accounts);
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while getting your account(s)'
         })
      }
   },

   async post(req, res) {
      try {
         const exists = await AccountSchema.findOne({ name: req.body.name, user: req.user.id });
         if (exists) {
            res.status(400).send('That account name already exists');
         }
         req.body.user = req.user.id;
         const account = await AccountSchema.create(req.body);
         await UserSchema.findByIdAndUpdate(req.user.id, {
            $push: { accounts: account._id }
         })
         res.json(account);
      } catch (e) {
         console.log(e);
         res.status(400).send(e.message);
      }
   },

   async put(req, res) {
      try {
         const account = await AccountSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
         res.json(account);
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while updating your account'
         })
      }
   },

   async delete(req, res) {
      try {
         await TransactionSchema.deleteMany({ account: req.params.id });
         const updated_user = await UserSchema.findOneAndUpdate({ _id: req.user.id }, {
            $pull: { accounts: req.params.id }
         }, { new: true });
         await AccountSchema.findByIdAndDelete(req.params.id);
         res.json(updated_user);
      } catch (e) {
         console.log(e);
         res.status(500).send({
            error: 'Something went wrong while deleting your account'
         })
      }
   }

}