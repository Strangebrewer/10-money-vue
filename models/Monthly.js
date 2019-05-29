
class Monthly {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Monthly = schema;
   }
}

export default Monthly;