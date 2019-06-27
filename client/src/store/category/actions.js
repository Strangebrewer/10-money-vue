import API from '../../utils/API';

export default {
   async updateCategory({ commit }, category_data) {
      const { _id } = category_data;
      return new Promise((resolve, reject) => {
         API.put('categories', _id, category_data)
            .then(res => {
               commit('setCategory', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async newCategory({ commit }, category_data) {
      return new Promise((resolve, reject) => {
         API.post('categories', category_data)
            .then(res => {
               commit('setCategory', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getCategories({ commit }) {
      return new Promise((resolve, reject) => {
         API.index('categories', )
            .then(res => {
               commit('setCategories', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getCategory({ commit }, category_id) {
      return new Promise((resolve, reject) => {
         API.index('categories', category_id)
            .then(res => {
               commit('setCategory', res.data[0]);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}