/*
 * @Author: wangshengxian
 * @Date: 2020-12-28 10:08:26
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-28 14:56:23
 * @Desc: 订单管理 - router
 */

import Layout from '@/views/layout'

const OrderList = () => import(/* webpackChunkName: 'orderList' */ '@/views/order/orderList')

const orderRouter = {
  path: '/order',
  name: 'Order',
  component: Layout,
  redirect: '/order/orderList',
  alwaysShow: true,
  meta: {
    title: '订单管理',
    icon: 'order-1'
  },
  children: [
    {
      path: 'orderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '订单列表',
        icon: 'menu'
      }
    }
  ]
}

export default orderRouter
