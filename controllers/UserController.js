import User from '../models/User';
import UserSchema from '../models/UserSchema';
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

      res.json(userData)
   } catch (e) {
      res.status(500).send({
         error: 'Something went wrong while getting user info'
      })
   }
}

export async function register(req, res) {
   try {

   } catch (e) {
      res.status(500).send({
         error: 'Something went wrong during registration. Please try again.'
      })
   }
}

export async function login(req, res) {
   try {
      const user = await user_model.login(req.body);
      res.json(user);
   } catch (e) {
      res.status(500).send({
         error: 'Something went wrong during login. Please try again.'
      })
   }
}