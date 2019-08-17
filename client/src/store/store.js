import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import monthly from './monthly';
import category from './category';
import transaction from './transaction';
import account from './account';
import allData from './allData';

Vue.use(Vuex);

export default new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',
   modules: {
      user,
      monthly,
      category,
      transaction,
      account,
      allData
   }
});