import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/pages/Landing';
import VueLinks from '@/pages/VueLinks';
import Signup from '@/pages/Signup';
import Account from '@/pages/Account';
import Category from '@/pages/Category';

Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/',
         name: 'landing',
         component: Landing
      },
      {
         path: '/vue-links',
         name: 'vue-links',
         component: VueLinks
      },
      {
         path: '/signup',
         name: 'signup',
         component: Signup
      },
      {
         path: '/account/:id',
         name: 'account-detail',
         props: true,
         component: Account
      },
      {
         path: '/category/:id',
         name: 'category-detail',
         props: true,
         component: Category
      }
   ]
})
