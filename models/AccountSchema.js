import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
   name: { type: String, required: true },
   description: String,
   balance: { type: Number, required: true },
   status: String,
   user: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

export default mongoose.model('Account', AccountSchema);