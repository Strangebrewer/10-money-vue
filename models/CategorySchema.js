import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   name: { type: String, required: true },
   description: String,
   user: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);