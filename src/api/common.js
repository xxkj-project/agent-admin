/*
 * @Author: wangshengxian
 * @Date: 2020-08-26 14:17:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-27 11:45:36
 * @Desc: 公共请求api, 例如导出excel, 上传图片/视频
 */
import request from '@/utils/request'
import Qs from 'qs'

// serverUrl
const baseUrl = process.env.VUE_APP_SERVER_URL

/**
 * 导出excel地址url集合
 */
const Excel = {
  // 主播
  anchor: '/lms/guildAnchor/excel'
}

/**
 * 导出excel，全局通用
 * @param {string} type 导出excel的类别
 * @param {object} data 参数对象
 */
export function exportExcel(type, data) {
  console.log('-type-', type, '-data-', data)
  if (baseUrl) {
    window.location.href = `${baseUrl}${Excel[`${type}`]}?${Qs.stringify(data)}`
  }
}

export function uploadImgOrVideo(data) {
  return request({
    url: '/product/uploadPhotos',
    method: 'post',
    data
  })
}
