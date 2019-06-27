import API from '../../utils/API';

export default {
   async getAccounts({ commit }) {
      return new Promise((resolve, reject) => {
         API.index('accounts')
            .then(res => {
               commit('setAccounts', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async newAccount({ commit }, account_data) {
      return new Promise((resolve, reject) => {
         API.post('accounts', account_data)
            .then(res => {
               commit('setAccount', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async updateAccount({ commit }, account_data) {
      const { _id, account_update } = account_data;
      return new Promise((resolve, reject) => {
         API.put('accounts', _id, account_update)
            .then(res => {
               commit('setAccount', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getAccount({ commit }, account_id) {
      return new Promise((resolve, reject) => {
         API.index('accounts', account_id)
            .then(res => {
               commit('setAccount', res.data[0]);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}