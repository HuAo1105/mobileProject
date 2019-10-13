// 把相关的用户请求封装到这里来
import request from '@/utils/request'
export default function login (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
