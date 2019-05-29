import mongoose from 'mongoose';

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER } = process.env;
const uri = process.env.MONGODB_URI || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/money_vue?retryWrites=true`;

mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false })
   .then(() => console.log('Connected to Mongo'))
   .catch(err => console.log('Error connecting to Mongo: ', err));

export default mongoose.connection;