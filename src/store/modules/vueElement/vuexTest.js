import {getTableList,} from "@/api/vueElement/vuexTestApi";
import {getWeather,} from "@/api/weather/weather";
const vuexTest = {
  namespaced: true,
  state: {
    countData: 0, //1.3 获取数据
    tableData: [] //2.3表格数据存放
  },
  getters: {
    getCount: state => { //2.4获取总条数
      return state.countData
    },
    getTableList: state => { //1.4 获取数据
      return state.tableData.data
    }
  },
  mutations: {
    set_table_data: (state, newData) => { //1.2获取数据
      state.tableData = newData
    },
    set_count_data: (state, newData) => { //2.2获取总条数
      state.countData = newData
    },
  },
  actions: {
    getTableData({
      commit
    }, params) { //请求数据

      return new Promise((resolve, reject) => {
        getTableList(params).then(response => { //获取
          
          const data = response.data //1.1从新赋值
          const dataCount = response.data.CountData //2.1从新赋值
          commit('set_table_data', data)
          commit('set_count_data', dataCount)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取天气
    async getWeatherData({
      commit
    }, params) {
      try {
        let result = await getWeather(params);
        debugger
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
export default vuexTest
