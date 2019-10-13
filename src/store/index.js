import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始值为null，用来存储用户相关信息
    user: getItem('user')
  },
  mutations: {
    // 修改state的值，user为传过来的值
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
