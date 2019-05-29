import Monthly from '../models/Monthly';
import MonthlySchema from '../models/MonthlySchema';
const monthly_model = new Monthly(MonthlySchema);

export default {

   async index(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your monthly expense(s)'
         })
      }
   },

   async post(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while creating your monthly expense'
         })
      }
   },

   async put(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while updating your monthly expense'
         })
      }
   },

   async delete(req, res) {
      try {

      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while deleting your monthly expense'
         })
      }
   }

}