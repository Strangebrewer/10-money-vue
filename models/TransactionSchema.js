import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
   account: { type: Schema.Types.ObjectId, ref: 'Account' },
   category: { type: Schema.Types.ObjectId, ref: 'Category' },
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   amount: { type: Number, required: true },
   type: { type: String, required: true, default: 'expense' },
   date: { type: Date, required: true, default: Date.now() }
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);