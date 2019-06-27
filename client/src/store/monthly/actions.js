import API from '../../utils/API';

export default {
   async updateMonthly({ commit }, monthly_data) {
      const { _id, monthly_update } = monthly_data;
      return new Promise((resolve, reject) => {
         API.put('monthlies',_id, monthly_update)
            .then(res => {
               commit('setMonthly', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async newMonthly({ commit }, monthly_data) {
      return new Promise((resolve, reject) => {
         API.post('monthlies',monthly_data)
            .then(res => {
               commit('setMonthly', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getMonthlies({ commit }) {
      return new Promise((resolve, reject) => {
         API.index('monthlies')
            .then(res => {
               commit('setMonthlies', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}