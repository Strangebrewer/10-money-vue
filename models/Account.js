
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
      const account = await this.Account.findById(req_body.account);

      let new_balance;
      if (req_body.type === 'payment') { // if it's a payment...
         if (account.type === 'debt') { // and it's a payment towards a debt (e.g. a credit card)...
            new_balance = account.balance - req_body.amount; // the balance goes down.
         } else {                                            // If it's not a debt, it's holdings...
            new_balance = account.balance + req_body.amount; // and the balance goes up.
         }
      } else { // if it's not a payment, it's an expense.
         if (account.type === 'debt') { // If it's a debt (e.g. Credit Card) as well as an expense (spending),...
            new_balance = account.balance + req_body.amount; // the debt goes up.
         } else {                                            // If it's not a debt, it's holdings...
            new_balance = account.balance - req_body.amount; // and the balance goes down.
         }
      }
      const updated_account = await this.Account.findByIdAndUpdate(
         req_body.account, { balance: new_balance }, { new: true }
      );
      return updated_account;
   }
}

export default Account;