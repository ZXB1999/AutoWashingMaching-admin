/* eslint-disable */ 
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/view/homepage/homepage.vue'
import Login from '@/view/login/login.vue'
import MachineList from '@/view/machine/machinelist.vue'
import UserList from '@/view/user/userlist.vue'
import OrderList from '@/view/order/orderlist.vue'

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

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
      },
      children: [
        {
          path: 'machineList',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'machineList',
          component: MachineList
        },
        {
          path: 'userList',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'userList',
          component: UserList
        },
        {
          path: 'orderList',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'orderList',
          component: OrderList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
