import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
   name: { type: String, required: true },
   balance: { type: Number, required: true },
   status: String,
   transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
   }],
   user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Account', AccountSchema);