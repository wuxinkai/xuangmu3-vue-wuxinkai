import http from '@/utils/httpAxios'
import { baseHref } from '@/api/server.ip'

function resorve(path){
  return baseHref + path
}
/**
 *  获取表格列表数据
 * @param {carentPage: 1, pageSize: 10, jumpTo: 5} params object
 */

 //请求数据
 export function getAsynData(params){ //进行 ajax请求
  return http.ajax({ url: resorve('/example/tableData'), method: 'GET' }, params)
 }