import http from '@/utils/httpAxios'
import axios from 'axios'
import Qs from 'qs'
import {
  baseHref
} from '@/api/server.ip'

function resorve(path) {
  return baseHref + path
}
/**
 *  获取登陆信息
 * 
 */
export function loginByUsername(username, password) {
  const params = {
    'username': username,
  }
  //发起请求
  return http.ajax({
    url: resorve('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/login'),
    method: 'post'
  }, params)
}
