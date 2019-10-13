import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    // 两种方式都可以
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // }
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login') // 懒加载
    },
    {
      path: '/',
      component: () => import('../views/tabbar'),
      children: [{
        path: '',
        name: 'home',
        component: () => import('../views/home')
      }]
    }
  ]
})
