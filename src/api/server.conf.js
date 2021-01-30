import {baseHref} from './server.ip'

function resorve(path) {
  return baseHref + path
}
// 导出自定义表格
export let uExportExcel = {
  url: resorve('/WorkDetailInfo/Work_detail_info/excel'),
  method: 'POST'
}

export default {
  apiHref: baseHref,
  // 基础api接口路径
  /**
   *  用户接口
   *
   */
  // 登录
  // uPostLogin: {
  //   url: resorve('/api/login'),
  //   method: 'POST'
  // },
  // // 登出
  // u_post_log_out: {
  //   url: resorve('/api/logout'),
  //   method: 'POST'
  // },
  // // 获取用户信息
  // uGetUserInfo: {
  //   url: resorve('/api/userInfo'),
  //   method: 'GET'
  // },
  // // 获取用户
  // uGetUser: {
  //   url: resorve('/api/user'),
  //   method: 'GET'
  // },
  // // 获取table列表数据
  // uGetTableList: {
  //   url: resorve('/api/tableList'),
  //   method: 'GET'
  // },
  // 测试反向代理http://10.4.0.37:1338
  getAreaList: {
    url: resorve('/Base_area/getAreaList'),
    method: 'GET'
  },
}
