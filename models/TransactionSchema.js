import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
   account: { type: Schema.Types.ObjectId, ref: 'Account' },
   category: { type: Schema.Types.ObjectId, ref: 'Category' },
   monthly: { type: Schema.Types.ObjectId, ref: 'Monthly' },
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   description: String,
   amount: { type: Number, required: true },
   type: {
      type: String,
      required: true,
      default: 'expense',
      enum: ['expense', 'payment']
   },
   date: { type: Date, required: true, default: Date.now() }
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);