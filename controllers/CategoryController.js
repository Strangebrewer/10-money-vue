import Category from '../models/Category';
import CategorySchema from '../models/CategorySchema';
const category_model = new Category(CategorySchema);

export default {

   async index(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your category(s)'
         })
      }
   },

   async post(req, res) {
      try {

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