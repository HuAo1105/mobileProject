import axios from 'axios'
import jsonBigInt from 'json-bigint'
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
export default request
