import axios from 'axios'

function API() {
   return axios.create({
      baseURL: 'http://localhost:3000', // use this at work
    //   baseURL: 'http://localhost:8080', // use this at home
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`
      }
   });
}

export function APIlogin(credentials) {
   return API().post('/users/login', credentials);
}

export default {
   index(route, id) {
      if (id) return API().get(`/${route}/${id}`)
      return API().get(`/${route}`);
   },
   post(route, data) {
      return API().post(`/${route}`, data);
   },
   put(route, id, data) {
      return API().put(`/${route}/${id}`, data);
   },
   delete(route, id) {
      return API().delete(`/${route}/${id}`);
   }
}