/*
 * @Author: wangshengxian
 * @Date: 2020-12-28 10:05:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-28 10:06:32
 * @Desc: 订单管理 - api
 */
import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/orderItem/list',
    method: 'get',
    data
  })
}
