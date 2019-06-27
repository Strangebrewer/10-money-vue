import dateFns from 'date-fns';

class Transaction {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Transaction = schema;
   }

   async find(req_params, user_id) {
      const where = { user: user_id };
      if (req_params.id)
         where._id = req_params.id;
      const transactions = await this.Transaction.find(where)
         .populate('account')
         .populate('category')
         .populate('monthly')
         .populate('source')
         .populate('destination');

      return transactions;
   }

   async transactionsByDateRange(user_id, from_date, to_date) {
      // pass dates in 'Jan 1, 2019' format
      const from = dateFns.subHours(new Date(from_date), 6);
      const to = dateFns.subHours(new Date(to_date), 6);
      return await this.Transaction.find({ date: { $gte: from, $lte: to }, user: user_id })
   }

   async transactionsThisMonth(user_id) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      const from = dateFns.subHours(new Date(`${month} 1, ${year}`), 6);
      return await this.Transaction.find({ date: { $gte: from }, user: user_id })
   }

   async transactionsLast30Days(user_id) {
      const from = dateFns.subDays(new Date(), 30);
      return await this.Transaction.find({ date: { $gte: from }, user: user_id })
   }
}

export default Transaction;