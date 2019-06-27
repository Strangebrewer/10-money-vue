import API, { APIlogin } from '../../utils/API';

export default {
   async login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
         APIlogin(credentials)
            .then(user => {
               commit('setUser', user.data.user);
               commit('setMonthlies', user.data.user.monthlies);
               commit('setCategories', user.data.user.categories);
               commit('setAccounts', user.data.user.accounts);
               localStorage.setItem('token', user.data.token);
               return resolve(user.data);
            })
            .catch(err => reject(err));
      })
   },
   async register({ commit }, user_data) {
      return new Promise((resolve, reject) => {
         API.post('users', user_data)
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
      commit('setUser', null);
      commit('setMonthlies', null);
      commit('setCategories', null);
      commit('setAccounts', null);
   },
   async getCurrentUser({ commit }) {
      return new Promise((resolve, reject) => {
         API.index('users')
            .then(user => {
               commit('setUser', user.data);
               commit('setMonthlies', user.data.monthlies);
               commit('setCategories', user.data.categories);
               commit('setAccounts', user.data.accounts);
               resolve(user.data);
            })
            .catch(err => reject(err));
      })
   }
}