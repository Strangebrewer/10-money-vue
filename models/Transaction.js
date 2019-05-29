import bcrypt from 'bcryptjs';

class Transaction {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Transaction = schema;
   }
}

export default Transaction;