import Categories from '../../api/Categories';

export default {
   async updateCategory({ commit }, category_data) {
      const { _id } = category_data;
      return new Promise((resolve, reject) => {
         Categories.put(_id, category_data)
            .then(res => {
               commit('setCategory', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async newCategory({ commit }, category_data) {
      return new Promise((resolve, reject) => {
         Categories.post(category_data)
            .then(res => {
               commit('setCategory', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   },
   async getCategories({ commit }) {
      return new Promise((resolve, reject) => {
         Categories.index()
            .then(res => {
               commit('setCategories', res.data);
               resolve(res.data);
            })
            .catch(err => reject(err));
      })
   }
}