/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:14
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-16 14:19:23
 * @Desc: 登录 - api
 */
import request from '@/utils/request'

// 登录
export function login(data) {
  console.log('-req-data-', data)
  return request({
    url: '/cmsAgent/login',
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return request({
    url: '/cmsAgent/logout',
    method: 'post'
  })
}

// 修改密码
export function editPass(data) {
  return request({
    url: '/cmsAgent/modify',
    method: 'post',
    data
  })
}
