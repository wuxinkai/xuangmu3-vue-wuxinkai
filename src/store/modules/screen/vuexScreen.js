// import { } from "@/api/screen/screenApi";

const vuesAccount = {
  namespaced: true,
  state: {
    timeObj: {} //电子表时间的对象 存放数字对应图片的url
  },
  getters: {
    getTimeObj: state => {
      //再把值返回给给timeElectronic.vue
      console.log( 11111111111111111111111111,state.timeObj)
      return state.timeObj
    },
  },
  mutations: {
    set_time_data: (state, newData) => {
      //timeElectronic.vue 传过来的参数  赋值给state.timeObj
      state.timeObj = newData
    },

  },
  actions: {
    //设置电子表对象值
    setTimes({ commit }, params) {
      return new Promise((resolve, reject) => {
        //接受timeElectronic.vue 传过来的参数
        commit('set_time_data', params)
        resolve('ok')
      })
    },
  }
}

export default vuesAccount

/*
  （1）this.$store.dispatch('screen/setTimes', tmp) 发送给vuex

  （2）actions 的 setTimes({ commit }, params) {  commit('set_time_data', params) }  接收参数

  （3）set_time_data 将值返给了mutations 从新赋值

  （4）getters 把值再送回给前端

  （5） 在timeElectronic.vue中接收  getTime() {  return this.$store.getters["screen/getTimeObj"]},

*/
