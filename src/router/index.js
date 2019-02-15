import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage/HomePage'
import TheProject from '@/pages/TheProject/TheProject'
import Documentation from '@/pages/Documentation/Documentation'
import Developers from '@/pages/Developers/Developers'
import Dashboard from '@/pages/Dashboard/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/project',
      name: 'TheProject',
      component: TheProject
    },
    {
      path: '/docs',
      name: 'Documentation',
      component: Documentation
    },
    {
      path: '/developers',
      name: 'Developers',
      component: Developers
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
