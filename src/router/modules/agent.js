/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-28 10:13:21
 * @Desc: 代理管理 - router
 */
import Layout from '@/views/layout'

const AgentList = () => import(/* webpackChunkName: 'agentList' */ '@/views/agent/agentList')

const NextAgentList = () => import(/* webpackChunkName: 'nextAgentList' */ '@/views/agent/agentList/nextAgentList')

const agentRouter = {
  path: '/agent',
  name: 'Agent',
  component: Layout,
  redirect: '/agent/agentList',
  alwaysShow: true,
  meta: {
    title: '代理管理',
    icon: 'agent-1'
  },
  children: [
    {
      path: 'agentList',
      name: 'AgentList',
      component: AgentList,
      meta: {
        title: '代理人列表',
        icon: 'menu'
      }
    },
    {
      path: 'nextAgentList',
      name: 'NextAgentList',
      component: NextAgentList,
      hidden: true, // 菜单栏隐藏
      meta: {
        title: '二级代理人列表',
        icon: 'menu'
      }
    }
  ]
}

export default agentRouter
