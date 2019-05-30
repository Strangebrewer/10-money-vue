
class Category {
   constructor(schema) {
      if (!schema || typeof schema !== 'function')
         throw new Error('A valid schema must be given to use this model');
      this.Category = schema;
   }

   async find(req_params, user_id) {
      const where = { user: user_id };
      let populate = '';

      if (req_params.id) {
         where._id = req_params.id;
         populate = 'transactions'
      }

      const categories = await this.Category.find(where)
         .populate(populate);

      return categories;
   }
}

export default Category;