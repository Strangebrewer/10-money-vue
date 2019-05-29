
class Account {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Account = schema;
   }

   async find(req_params, user_id) {
      const where = { user: user_id };
      let populate = '';

      if (req_params.id) {
         where._id = req_params.id;
         populate = 'transactions'
      }

      const accounts = await this.Account.find(where)
         .populate(populate);

      return accounts;
   }

   async calculateNewBalance(req_body) {
      const account = await this.Account.findById(req_body.account_id);
      let new_balance;
      if (req_body.type === 'payment')
         new_balance = account.balance - req_body.amount;      
      else new_balance = account.balance + req_body.amount;
      
      const updated_account = await this.Account.findByIdAndUpdate(req_body.account_id, {
         balance: new_balance,
         $push: { transactions: req_body.transaction_id }
      }, { new: true })
      return updated_account;
   }
}

export default Account;