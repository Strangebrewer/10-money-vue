import API from '../../utils/API';

export default {
   async postTransaction({ commit }, transaction_data) {
      return new Promise((resolve, reject) => {
         API.post('transactions', transaction_data)
            .then(res => {
               commit('setTransaction', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getTransactions({ commit }) {
      return new Promise((resolve, reject) => {
         API.index('transactions')
            .then(res => {
               commit('setTransactions', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}