import bcrypt from 'bcryptjs';
import { sign } from '../passport';

class User {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.User = schema;
   }

   async login(req_body) {
      const { username, password } = req_body;

      const response = await this.User.findOne({ username });
      if (!response)
         throw new Error('Username is bonkers, yo.');

      const passwordValid = this.checkPassword(password, response.password);
      if (passwordValid) {
         const { _id, email, first_name, last_name, username } = response;
         const token = sign({ id: _id, username, });
         const user = { _id, email, first_name, last_name, username };
         return { token, user };
      } else {
         throw new Error('Who you tryin\' to fool? That ain\'t yo password!');
      }
   }

   checkPassword(inputPassword, password) {
      return bcrypt.compareSync(inputPassword, password);
   }
}

export default User;