import API from './API';

export default {
   index(id) {
      if (id) return API().get(`/monthlies/${id}`);
      return API().get(`/monthlies`);
   },
   put(id, monthly_data) {
      return API().put(`/monthlies/${id}`, monthly_data);
   },
}