import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   name: { type: String, required: true },
   description: String,
   type: { type: String, enum: ['expense', 'income'], default: 'expense' },
   user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);