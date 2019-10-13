import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import * as rules from 'vee-validate/dist/rules'
import {
  Button,
  NavBar,
  Field,
  CellGroup,
  Cell,
  Toast,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  List
} from 'vant'

// 配置使用中文语言
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
  // extend(校验对象，校验规则)
  extend('phone', {
    validate: value => /^1[3456789]\d{9}$/.test(value),
    // message为提示信息
    message: '您输入的手机号有误'
  })
}
// 注册为全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue // 注册 // 按需加载，如果在全局注册，打包时文件太大
  .use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(Toast)
  .use(Row)
  .use(Col)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
