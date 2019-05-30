import Monthly from '../models/Monthly';
import MonthlySchema from '../models/MonthlySchema';
const monthly_model = new Monthly(MonthlySchema);

export default {

   async index(req, res) {
      try {
         const monthlies = await monthly_model.find(req.params, req.user.id);
         res.json(monthlies);
      } catch (e) {
         res.status(500).send({
            error: 'Something went wrong while getting your monthly expense(s)'
         })
      }
   },

   async post(req, res) {
      try {
         const exists = await MonthlySchema.findOne({ name: req.body.name });
         if (exists) {
            return res.status(400).send({ error: 'That monthly expense already exists' });
         }
         req.body.user = req.user.id
         const monthly = await MonthlySchema.create(req.body);
         res.json(monthly);
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