import bcrypt from 'bcryptjs';
import { sign } from '../../passport';

class User {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.User = schema;
   }
}

export default User;