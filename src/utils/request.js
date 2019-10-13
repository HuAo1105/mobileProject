import axios from 'axios'
import jsonBigInt from 'json-bigint'
import store from '../store'
// 这是另一种设置baseURL的方式
// 这个可以设置多个请求
// 而axios.defaults.baseURL只能设置一个
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 配置处理大数字
request.defaults.transformResponse = [function (data) {
  return data ? jsonBigInt.parse(data) : {}
}]
request.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // config是要发送请求的配置信息
  const user = store.state.user
  if (user) {
    // Authorization 是后端要求的名字，不能瞎写
    // 数据值 "Bearer空格token" 也是后端要求的数据格式，不能瞎写
    // 千万!千万!千万!注意，Bearer 和 token 之间的空格不能少
    // 什么意义？这是后端要求的，我们决定不了。
    config.headers['Authorization'] = `Bearer ${user.token}` // 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
  }
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
export default request
