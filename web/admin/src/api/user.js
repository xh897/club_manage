import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminUser',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function setPassword(data) {
  return request({
    url: '/update/admin/update',
    method: 'put',
    data
  })
}
