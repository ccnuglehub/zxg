import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Newslist from '@/components/Newslist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'/newslist',
      name:'newslist',
      component: Newslist,
    },
    {
      path: '*',
      component:Login
    }
  ]
})
