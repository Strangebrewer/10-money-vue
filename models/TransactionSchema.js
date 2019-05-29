import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
   account_id: { type: Schema.Types.ObjectId, ref: 'Account'},
   category_id: { type: Schema.Types.ObjectId, ref: 'Category'},
   user_id: { type: Schema.Types.ObjectId, ref: 'User'},
   amount: { type: Number, required: true },
   date: { type: Date, required: true, default: Date.now()}
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);