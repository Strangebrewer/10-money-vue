import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MonthlySchema = new Schema({
   name: { type: String, required: true },
   amount: { type: Number, required: true },
   transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
   }],
   user: { type: Schema.Types.ObjectId, ref: 'User'},
   due_date: Date
}, { timestamps: true });

export default mongoose.model('Monthly', MonthlySchema);