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
   }
}