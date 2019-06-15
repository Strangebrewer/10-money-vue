import Monthlies from '../../api/Monthlies';

export default {
   async updateMonthly({ commit }, monthly_data) {
      const { _id, monthly_update } = monthly_data;
      return new Promise((resolve, reject) => {
         Monthlies.put(_id, monthly_update)
            .then(res => {
               commit('setMonthly', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async newMonthly({ commit }, monthly_data) {
      return new Promise((resolve, reject) => {
         Monthlies.post(monthly_data)
            .then(res => {
               commit('setMonthly', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getMonthlies({ commit }) {
      return new Promise((resolve, reject) => {
         Monthlies.index()
            .then(res => {
               commit('setMonthlies', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}