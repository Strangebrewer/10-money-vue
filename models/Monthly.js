
class Monthly {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Monthly = schema;
   }

   async find(req_params, user_id) {
      const where = { user: user_id };
      let populate = '';

      if (req_params.id) {
         where._id = req_params.id;
         populate = 'transactions'
      }

      const monthlies = await this.Monthly.find(where)
         .populate(populate);

      return monthlies;
   }
}

export default Monthly;