import API from '../../utils/API';

export default {
   async getAllData({ commit }) {
      return new Promise((resolve, reject) => {
         API.getAllData()
            .then(res => {
               commit('setAllData', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}