import Authentication from '../../api/Authentication';
import Accounts from '../../api/Accounts';

export default {
   async login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
         Authentication.login(credentials)
            .then(user => {
               commit('setUser', user.data.user);
               commit('setMonthlies', user.data.user.monthlies);
               commit('setCategories', user.data.user.categories);
               localStorage.setItem('token', user.data.token);
               return resolve(user.data);
            })
            .catch(err => reject(err));
      })
   },
   async register({ commit }, user_data) {
      return new Promise((resolve, reject) => {
         Authentication.register(user_data)
            .then(user => {
               commit('setUser', user.data.user);
               localStorage.setItem('token', user.data.token);
               return resolve(user.data);
            })
            .catch(err => reject(err));
      })
   },
   logout({ commit }) {
      localStorage.removeItem('token');
      commit('setUser', null)
   },
   async getCurrentUser({ commit }) {
      return new Promise((resolve, reject) => {
         Authentication.getCurrentUser()
            .then(user => {
               commit('setUser', user.data);
               commit('setMonthlies', user.data.monthlies);
               commit('setCategories', user.data.categories);
               resolve(user.data);
            })
            .catch(err => reject(err));
      })
   },



   newAccount({ commit }, account_data) {
      return new Promise((resolve, reject) => {
         Accounts.post(account_data)
            .then(account => {
               return resolve(account.data)
            })
            .catch(err => reject(err))
      })
   }
}