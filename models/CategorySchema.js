import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   name: { type: String, required: true },
   transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
   }],
   user: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);