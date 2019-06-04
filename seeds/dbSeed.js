import 'dotenv/config';
import '../connection';
import bcrypt from 'bcryptjs';
import UserSchema from '../models/UserSchema';
import TransactionSchema from '../models/TransactionSchema';
import AccountSchema from '../models/AccountSchema';
import MonthlySchema from '../models/MonthlySchema';
import CategorySchema from '../models/CategorySchema';

import user_seed from './users.json';
import account_seed from './accounts.json';
import category_seed from './categories.json';
import monthly_seed from './monthlies.json';
import transaction_seed from './transactions.json';

const pw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null);

async function seedDb() {
   try {
      await TransactionSchema.deleteMany({});
      await AccountSchema.deleteMany({});
      await MonthlySchema.deleteMany({});
      await CategorySchema.deleteMany({});
      await UserSchema.deleteMany({});

      user_seed.forEach(user => {
         user.password = pw;
      });

      const users = await UserSchema.insertMany(user_seed);
      account_seed.forEach(account => {
         account.user = users[0]._id;
      });
      category_seed.forEach(category => {
         category.user = users[0]._id;
      });
      monthly_seed.forEach(monthly => {
         monthly.user = users[0]._id;
      });

      const accounts = await AccountSchema.insertMany(account_seed);
      for (let i = 0; i < accounts.length; i++) {
         const element = accounts[i];
         const new_user = await UserSchema.findByIdAndUpdate(users[0]._id, {
            $push: { accounts: element._id }
         })
      }

      const categories = await CategorySchema.insertMany(category_seed);
      for (let i = 0; i < categories.length; i++) {
         const element = categories[i];
         await UserSchema.findByIdAndUpdate(users[0]._id, {
            $push: { categories: element._id }
         })
      }

      const monthlies = await MonthlySchema.insertMany(monthly_seed);
      for (let i = 0; i < monthlies.length; i++) {
         const element = monthlies[i];
         await UserSchema.findByIdAndUpdate(users[0]._id, {
            $push: { monthlies: element._id }
         })
      }

      for (let i = 1; i < transaction_seed.length; i += 4) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.account = accounts[4]._id;
      }

      for (let i = 2; i < transaction_seed.length; i += 4) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.account = accounts[3]._id;
      }

      for (let i = 3; i < transaction_seed.length; i += 4) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.account = accounts[0]._id;
      }

      for (let i = 0; i < transaction_seed.length; i += 4) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.account = accounts[5]._id;
      }

      for (let i = 0; i < transaction_seed.length; i += 11) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.category = categories[0]._id;
      }

      for (let i = 1; i < transaction_seed.length; i += 6) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.category = categories[1]._id;
      }

      for (let i = 5; i < transaction_seed.length; i += 33) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.category = categories[3]._id;
      }

      for (let i = 2; i < transaction_seed.length; i += 23) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.category = categories[2]._id;
      }

      for (let i = 3; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[0]._id;
         element.amount = 109000;
         element.type = 'expense'
      }

      for (let i = 2; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[1]._id;
         element.amount = 6695;
         element.type = 'expense'
      }

      for (let i = 5; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[2]._id;
         element.amount = 5500;
         element.type = 'expense'
      }

      for (let i = 7; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[3]._id;
         element.amount = 5500;
         element.type = 'expense'
      }

      for (let i = 8; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[4]._id;
         element.amount = 12099;
         element.type = 'expense'
      }

      for (let i = 11; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[5]._id;
         element.amount = 11600;
         element.type = 'expense'
      }


      for (let i = 2; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[6]._id;
         element.amount = 18787;
         element.type = 'expense'
      }

      for (let i = 3; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[7]._id;
         element.amount = 34000;
         element.type = 'expense'
      }

      for (let i = 6; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[8]._id;
         element.amount = 27500;
         element.type = 'expense'
      }

      for (let i = 22; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[9]._id;
         element.amount = 30000;
         element.type = 'expense'
      }

      for (let i = 12; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[10]._id;
         element.amount = 2500,
            element.type = 'expense'
      }

      for (let i = 15; i < transaction_seed.length; i += 87) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.monthly = monthlies[11]._id;
         element.amount = 35000;
         element.type = 'expense'
      }

      for (let i = 0; i < transaction_seed.length; i += 43) {
         if (i >= transaction_seed.length) return;
         const element = transaction_seed[i];
         element.account = accounts[3]._id
         element.amount = 366734;
         element.type = 'payment'
      }

      for (let i = 0; i < transaction_seed.length; i++) {
         const element = transaction_seed[i];
         element.user = users[0]._id         
      }

      const transactions = await TransactionSchema.insertMany(transaction_seed);

      const final_users = await UserSchema.findById(users[0]._id);      
      
      console.log('final_users:::', final_users);

      console.log("***********Aaaaaand, here's your insert counts:*************");
      console.log(users.length + " user records inserted!");
      console.log(accounts.length + " account records inserted!");
      console.log(categories.length + " category records inserted!");
      console.log(monthlies.length + " monthly records inserted!");
      console.log(transactions.length + " transaction records inserted!");
      process.exit(0);

   } catch (e) {
      console.log('error in dbSeed:::', e);
      process.exit(1);
   }
}

seedDb();
