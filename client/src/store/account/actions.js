import Accounts from '../../api/Accounts';

export default {
   async getAccounts({ commit }) {
      return new Promise((resolve, reject) => {
         Accounts.index()
            .then(res => {
               commit('setAccounts', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async newAccount({ commit }, account_data) {
      return new Promise((resolve, reject) => {
         Accounts.post(account_data)
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
         Accounts.put(_id, account_update)
            .then(res => {
               commit('setAccount', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}