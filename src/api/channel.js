import request from '../utils/request'
export function channel () {
  return request({
    url: '/app/v1_0/user/channels'
  })
}
