import { getAsynData } from "@/api/vueElement/tableApi"; //(一)
const vuesAccount = {
  //（1）驱动应用的数据源
  namespaced: true, //必须加 vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state: {
    scores: [
      { date: "2018-10-12",id:1, name: "store的本地数据1", WORK_TITLE: "345",CREATE_USERnow:'12345',USER_TYPEnow:'e233e23e32e',CREATE_TIMEnow:'133222' },
      { date: "2018-10-12",id:2, name: "store的本地数据2", WORK_TITLE: "345",CREATE_USERnow:'12345',USER_TYPEnow:'e233e23e32e',CREATE_TIMEnow:'133222' },
      { date: "2018-10-12",id:3, name: "store的本地数据3", WORK_TITLE: "345",CREATE_USERnow:'12345',USER_TYPEnow:'e233e23e32e',CREATE_TIMEnow:'133222' },
      { date: "2018-10-12",id:4, name: "store的本地数据4", WORK_TITLE: "345",CREATE_USERnow:'12345',USER_TYPEnow:'e233e23e32e',CREATE_TIMEnow:'133222' },
    ],
    AsynData: [] //异步数据
  },
  //(2)滤并计算state的的内容
  getters: {
    getTableList: state => {
      return state.scores;
    },
    //异步数据
    getAsynData: state => {
      //(二)
      debugger;
      return state.AsynData;
    }
  },
  //（3）更改Vuex 的store 中的状态的唯一方式就是提交
  mutations: {},
  //（4）异步调用 在mutation 中混异步调用会导致你的程序很难调试 //actions  响应在view 上的用户书输入导致的状态变化
  actions: {
    getData() {
      //异步请求第二步 （四）
      return new Promise((resolve, reject) => {
        getAsynData().then(response => {//异步请求第三步 获取返回结果
            const data = response.data;
            resolve(data); //返回给前端数据
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  }
};
export default vuesAccount;
