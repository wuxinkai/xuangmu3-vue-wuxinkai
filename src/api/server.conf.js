import { baseHref } from './server.ip'

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
  getAreaList: {
    url: resorve('/Base_area/getAreaList'),
    method: 'GET'
  },


}
