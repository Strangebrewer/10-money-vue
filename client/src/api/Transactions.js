import API from './API';

export default {
   index(id) {
      if (id) return API().get(`/transactions/${id}`);
      return API().get(`/transactions`);
   },
   post(transaction_data) {
      return API().post('/transactions', transaction_data);
   },
   put(id, transaction_data) {
      return API().put(`/transactions/${id}`, transaction_data);
   },
}