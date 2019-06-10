import API from './API';

export default {
   index(id) {
      if (id) return API().get(`/accounts/${id}`)
      return API().get(`/accounts`);
   },
   post(account_data) {
      return API().post('/accounts', account_data);
   },
   put(id, account_data) {
      return API().put(`/accounts/${id}`, account_data);
   }
}