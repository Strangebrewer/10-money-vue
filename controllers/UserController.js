import User from '../models/User';
import UserSchema from '../models/UserSchema';
import TransactionSchema from '../models/TransactionSchema';
import AccountSchema from '../models/AccountSchema';
import CategorySchema from '../models/CategorySchema';
import MonthlySchema from '../models/MonthlySchema';
const user_model = new User(UserSchema);

export async function getCurrentUser(req, res) {
   try {
      const user = await UserSchema.findById(req.user.id)
         .populate('accounts')
         .populate('monthlies')
         .populate('categories');

      const {
         _id, username, email, first_name, last_name,
         accounts, monthlies, categories
      } = user;

      const userData = {
         _id, username, email, first_name, last_name,
         accounts, monthlies, categories
      }

      res.json(userData);
   } catch (e) {
      console.log(e);
      res.status(500).send({
         error: e.message
      });
   }
}

export async function register(req, res) {
   try {
      const user = await user_model.register(req.body);
      res.json(user);
   } catch (e) {
      console.log(e);
      res.status(418).send({
         error: e.message
      });
   }
}

export async function login(req, res) {
   try {
      const user = await user_model.login(req.body);
      res.json(user);
   } catch (e) {
      console.log(e);
      res.status(418).send({
         error: e.message
      });
   }
}

export async function put(req, res) {
   try {
      const user = await user_model.updateUser(req.body, req.user.id);
      res.json(user);
   } catch (e) {
      console.log(e);
      res.status(500).send({
         error: e.message
      });
   }
}

export async function updatePassword(req, res) {
   console.log('req.user:::', req.user);
   try {
      const user = await user_model.updatePassword(req.body, req.user);
      res.json(user);
   } catch (e) {
      console.log(e);
      res.status(500).send({
         error: e.message
      });
   }
}

export async function remove(req, res) {
   try {
      const user = await UserSchema.findByIdAndDelete(req.params.id);

      if (user.accounts.length) {
         user.accounts.forEach(account_id => {
            TransactionSchema.deleteMany({ account: account_id });
         });
         await AccountSchema.deleteMany({ user: user._id });
      }

      if (user.categories.length)
         await CategorySchema.deleteMany({ user: user._id });

      if (user.monthlies.length)
         await MonthlySchema.deleteMany({ user: user._id });

      res.json(user);
   } catch (e) {
      console.log(e);
      res.status(500).send({
         error: e.message
      });
   }
}