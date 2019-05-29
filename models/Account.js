import bcrypt from 'bcryptjs';

class Account {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Account = schema;
   }
}

export default Account;