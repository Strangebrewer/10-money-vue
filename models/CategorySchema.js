import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// if the category type is income, it must have a destination.
// I should look into how to write a hook that will enforce that.
const CategorySchema = new Schema({
   name: { type: String, required: true },
   description: String,
   type: { type: String, enum: ['expense', 'income'], default: 'expense' },
   default_amount: Number,
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   default_account: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);
