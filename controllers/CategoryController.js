import Category from '../models/Category';
import CategorySchema from '../models/CategorySchema';
const category_model = new Category(CategorySchema);

export default {

   async index(req, res) {
      try {
         const categories = await category_model.find(req.params, req.user.id);
         res.json(categories);
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your category(s)'
         })
      }
   },

   async post(req, res) {
      try {
         const exists = await CategorySchema.findOne({ name: req.body.name, user: req.user.id });
         if (exists) {
            return res.status(400).send({ error: 'That category already exists' });
         }
         req.body.user = req.user.id
         const category = await CategorySchema.create(req.body);
         await UserSchema.findByIdAndUpdate(req.user.id, {
            $push: { categories: category._id }
         })
         res.json(category);
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while creating your category'
         })
      }
   },

   async put(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while updating your category'
         })
      }
   },

   async delete(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while deleting your category'
         })
      }
   }

}