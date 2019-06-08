import API from './API';

export default {
   index(id) {
      return API().get(`/accounts`);
   },
   post(account_data) {
      return API().post('/accounts', account_data);
   }
}