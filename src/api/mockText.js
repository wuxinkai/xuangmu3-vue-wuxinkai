import http from '@/utils/httpAxios'
import axios from 'axios'


export const mapknowledge = param => {
  

  let data = $http.request({
    url: 'http://localhost:3000/news',
    method: 'get',
    // header: { "content-type": "application/json" }
  })
  debugger
  return data
}



