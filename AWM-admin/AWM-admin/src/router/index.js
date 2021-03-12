/* eslint-disable */ 
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/view/homepage/homepage.vue'
import Login from '@/view/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
      meta: {
        needLogin: true, //需要加校检判断的路由
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
