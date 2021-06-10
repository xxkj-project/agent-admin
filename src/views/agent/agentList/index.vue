<!--
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:57:01
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-15 13:39:04
 * @Desc: 代理管理 - 代理人列表
-->
<template>
  <div class="agentList-page">
    <el-button slot="button" type="primary" size="mini" @click="onAddAgent" v-if="isGeneralAgent"
      >添加二级代理</el-button
    >

    <div class="listBox">
      <div class="tableBox">
        <el-table
          :data="tableList"
          tooltip-effect="dark"
          style="width: 100%"
          row-key="id"
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="agentName" label="代理名称" min-width="120"></el-table-column>
          <el-table-column prop="agentCode" label="渠道号" min-width="120"></el-table-column>
          <el-table-column prop="agentLink" label="购物链接" min-width="320"></el-table-column>
          <el-table-column prop="total" label="代理总销售额" min-width="120"></el-table-column>
          <el-table-column prop="settleFee" label="结算金额" min-width="120"></el-table-column>
          <el-table-column
            prop="settleFee"
            label="未结算金额"
            :formatter="feeFormatter"
            min-width="120"
          ></el-table-column>
          <el-table-column label="操作" min-width="120" v-if="isGeneralAgent">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="onEditAgent(scope.row, scope.$index)"
                v-if="scope.$index != 0"
                >编辑</el-button
              >
              <el-button
                type="primary"
                size="mini"
                :disabled="scope.row.total == scope.row.settleFee"
                @click="onSettle(scope.row, scope.$index)"
                v-if="scope.$index > 0"
                >结算</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :currentPage.sync="pagination.currentPage"
        :pageSize.sync="pagination.pageSize"
        :total="pagination.total"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      />
    </div>
    <addAgent
      :type="addAgentType"
      :parentId="parentId"
      :formData="agentFormData"
      @success="handleAddAgent"
      :visible.sync="isAddAgent"
    />

    <settleMoney :formData="settleFormData" :visible.sync="isSettle" @success="handleSettleMoney" />
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import addAgent from '@/views/agent/components/agenList/addAgent'
import settleMoney from '@/views/agent/components/agenList/settleMoney'
import { getAgentList } from '@/api/agent'
import jsPrecision from '@/utils/jsPrecision'
export default {
  name: '',
  data() {
    return {
      isSettle: false,
      settleFormData: {},
      isGeneralAgent: false,
      isAddAgent: false,
      addAgentType: 'add',
      parentId: 0, // 父级代理id
      agentFormData: {
        agentName: '',
        agentCode: '',
        account: '',
        password: ''
      },
      oneAgentObj: {}, // 一级代理人
      tableList: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      linkUrl: '' // 渠道推广链接
    }
  },

  computed: {
    isProdEnv() {
      return process.env.VUE_APP_SERVER_ENV
    }
  },
  created() {
    this.linkUrl = this.setLinkUrl()
    console.log('-link-url-', this.linkUrl)
    this.getData()
  },
  mounted() {
    // TODO: 添加一个结算功能，需要二级代理来结算
  },
  methods: {
    feeFormatter(row) {
      return jsPrecision.sub(row.total, row.settleFee)
    },
    setLinkUrl() {
      // 渠道推广链接
      let linkObj = {
        test: 'http://tapi.tangseng.io/shopdirsir/index',
        prod: 'http://blog.xinxingouwu.com/shopdirsir/index'
      }
      return this.isProdEnv === 'prod' ? linkObj.prod : linkObj.test
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onAddAgent() {
      console.log('-add-')
      this.isAddAgent = true
      this.addAgentType = 'add'
      this.agentFormData = { agentName: '', agentCode: '', account: '', password: '' }
      this.parentId = this.tableList[0].id
      console.log('-parentId-', this.parentId)
    },
    onEditAgent(row, index) {
      console.log('-edit-', row, index)
      const { agentName, agentCode, id, account, password } = row
      this.isAddAgent = true
      this.addAgentType = 'edit'
      this.agentFormData = { account, password, agentName, agentCode, agentId: id }
      this.parentId = this.tableList[0].id
      console.log(this.agentFormData)
    },
    onSettle(row, index) {
      console.log('-结算-', row, index)
      if (row.total === row.settleFee) {
        this.$message({
          message: '当前没有可结算的金额！',
          type: 'warning'
        })
        return
      }
      this.isSettle = true
      this.settleFormData = { ...row }
      this.settleFormData.settleFee = 0
      this.settleFormData.total = jsPrecision.sub(row.total, row.settleFee)
    },
    handleAddAgent() {
      if (this.addAgentType === 'add') {
        // 添加成功后初始化第一页
        this.getInitData()
      } else {
        // 编辑成功后刷新当前页
        this.getData()
      }
    },
    handleSettleMoney() {
      this.getData()
    },
    currentChange(pageNum) {
      this.pagination.pageNum = pageNum
      this.getData()
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },

    // 数据请求
    getData() {
      console.log('-env-', this.isProdEnv)
      const params = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage
      }
      // console.log('-params-', params)
      let isInit = params.pageNum === 1
      // console.log('-is-init-', isInit)
      getAgentList(params).then(res => {
        // console.log('-res-', res)
        let data = res.data
        // console.log('-data-', data)
        this.pagination.total = data.count - 1
        data.list = this.setListData(data.list)
        if (isInit) {
          // console.log('-初始化-')
          this.oneAgentObj = data.list[0]
          this.tableList = [this.oneAgentObj]
          this.tableList[0].children = data.list.slice(1) // 获取数组除了第一个元素的其它元素
        } else {
          // console.log('其它页')
          this.tableList = [this.oneAgentObj]
          this.tableList[0].children = data.list
        }
        this.isGeneralAgent = this.tableList[0].parentId === 0
        console.log('-table-list-', this.tableList)
      })
    },
    setListData(list) {
      let result = list.map(val => ({ agentLink: `${this.linkUrl}/${val.agentCode}`, ...val }))
      return result
    }
  },
  components: { pagination, addAgent, settleMoney }
}
</script>

<style lang="less" scoped></style>
