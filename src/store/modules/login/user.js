// import Cookies from 'js-cookie'
import {
    loginByUsername
} from '@/api/login'

const vuesAccount = {
    namespaced: true,
    state: {
        timeObj: {}
    },
    getters: {
        getTimeObj: state => {
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
        login({ commit }, userInfo) {
            const username = userInfo.username.trim() //trim浏览器版本限制：JavaScript Version 1.8
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password, userInfo.code).then(response => {
                    resolve(`{"org_user_id":"admin","org_dept_id":"110001","org_term_no":"218.10.97.236","orguser_cn_name":"超级管理员","orgdept_cn_name":"恒丰企业","org_channel_code":"01","org_work_code":"","submit_type":1,"org_dprl_expls":"平台超级管理员","br_sbsbno":"","work_seq":"20200806000000052","token":"-1918411306","org_rs_code":"15","is_need_token":1}`)
                })
            })
        }
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