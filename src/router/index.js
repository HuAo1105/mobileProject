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
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
