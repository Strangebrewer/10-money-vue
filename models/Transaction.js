import dateFns from 'date-fns';

class Transaction {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Transaction = schema;
   }

   async find(user_id, req_params) {
      const where = { user: user_id };

      if (req_params.id)
         where._id = req_params.id;

      const transactions = await this.Transaction.find(where)
         .populate('account_id')

      return transactions;
   }

   async transactionsByDateRange(user_id, from_date, to_date) {
      // pass dates in 'Jan 1, 2019' format
      return await this.Transaction.find({ date: { $gt: new Date(from_date), $lte: new Date(to_date) }, user: user_id })
   }

   async transactionsThisMonth(user_id) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      const from = `${month} 1, ${year}`;
      return await this.Transaction.find({ date: { $gt: new Date(from) }, user: user_id })
   }

   async transactionsLast30Days(user_id) {
      const from = dateFns.subDays(new Date(), 30);
      return await this.Transaction.find({ date: { $gte: new Date(from) }, user: user_id })
   }
}

export default Transaction;