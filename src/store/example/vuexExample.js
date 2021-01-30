const vuexExample = {
    namespaced: true, //必须加 vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state: {
        count: 0,
        listData: [],
    },
    // 有点类似计算属性，改变state里面的count数据
    getters: {

    },
    mutations: { //管理员 用来更改状态，
        addCounts(state) { //state 是自动放入，默认指的是当前的state
            state.count += 1
        },
        minus(state) {
            state.count--
      },
        //vuexExample2的ajax请求，存储到vuexExample里面显示
        addList(state, data) {
          state.listData = data;
        }
    },
    actions: {

    }
};
export default vuexExample;