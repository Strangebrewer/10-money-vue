import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   username: { type: String, required: true },
   password: { type: String, required: true, default: tempPw },
   name: { type: String, required: true },
   email: { type: String, required: false },
   accounts: [{
      type: Schema.Types.ObjectId,
      ref: 'Account'
   }],
   monthlies: [{
      type: Schema.Types.ObjectId,
      ref: 'Monthly'
   }],
   categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
   }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);