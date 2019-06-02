import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing';
import VueLinks from '@/components/VueLinks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/vue-links',
      name: 'Vue links',
      component: VueLinks
    }
  ]
})
