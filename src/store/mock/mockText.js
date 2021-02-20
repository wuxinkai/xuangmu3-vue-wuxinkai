// import IpcService from "@/api/mockText";
// import IpcService from "../../api/mockText";

const vuesAccount = {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {


  },
  actions: {
    //本地mock测试
    async mock_test({
      commit
    }, params) {
      try {
        let result = await IpcService.mock_test(params);
        return result;
      } catch (error) {
        return error;
      }
    },
  }
}

export default vuesAccount
