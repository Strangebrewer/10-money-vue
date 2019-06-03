import Authentication from '../../api/Authentication';
import Accounts from '../../api/Accounts';

export default {
   async login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
         Authentication.login(credentials)
            .then(user => {
               console.log('user:::', user);
               commit('setUser', user.data.user);
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
               console.log('user in register action:::', user);
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



   newAccount({ commit }, account_data) {
      return new Promise((resolve, reject) => {
         Accounts.post(account_data)
            .then(account => {
               console.log('account in newAccount action:::', account);
               return resolve(account.data)
            })
            .catch(err => reject(err))
      })
   }
}