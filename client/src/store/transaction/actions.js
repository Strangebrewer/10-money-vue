import Transactions from '../../api/Transactions';

export default {
   async postTransaction({ commit }, transaction_data) {
      return new Promise((resolve, reject) => {
         Transactions.post(transaction_data)
            .then(res => {
               commit('setTransaction', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getTransactions({ commit }) {
      return new Promise((resolve, reject) => {
         Monthlies.index()
            .then(res => {
               commit('setTransactions', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}