import API from './API';

export default {
   index(id) {
      if (id) return API().get(`/categories/${id}`);
      return API().get(`/categories`);
   },
   post(category_data) {
      return API().post('/categories', category_data);
   },
   put(id, category_data) {
      return API().put(`/categories/${id}`, category_data);
   },
}