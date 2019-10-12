import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import {
  Button,
  NavBar,
  Field,
  CellGroup,
  Toast
} from 'vant' // 按需加载，如果在全局注册，打包时文件太大
Vue // 注册
  .use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
