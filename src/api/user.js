import request from '@/utils/request'

export function _login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function _getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function _logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
