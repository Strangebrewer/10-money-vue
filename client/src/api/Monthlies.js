import API from './API';

export default {
   put(id, monthly_data) {
      return API().put(`/monthlies/${id}`, monthly_data);
   },
   index() {
      return API().get(`/monthlies`);
   },
}