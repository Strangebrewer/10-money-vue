
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
}

export default Transaction;