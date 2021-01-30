import Vue from "vue";
import message_box from "./message/index2.vue";
export var messageBox = (function() {
  var defaults = {
    title: "",
    content: "",
    cancel: "",
    ok: "",
    handleCancle: null, //取消事件
    handleOk: null //确认事件
  };

  var MyComponent = Vue.extend(message_box); //  vue.extend 局部注册  在实例化extends组件构造器  , extend 就是一个容器

  return function(opts) {
    //接收默认函数对默认进行覆盖
    for (var attr in defaults) {
      defaults[attr] = opts[attr]; //让默认的 等于传进来的
    }

    var vm = new MyComponent({
      el: document.createElement("div"), // 只在用 new 创建实例时生效  创建一个容器装载我的的弹出框，
      data: { //vm.$data 访问原始数据对象 因此访问 vm.a 等价于访问 vm.$data.a
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        //关闭事件
        handleCancle() {
          defaults.handleCancle && defaults.handleCancle.call(this);
          document.body.removeChild(vm.$el); //vm.$el就是document.createElement("div")     在实例挂载之后，元素可以用 vm.$el 访问。  删除全局注册
        },
        handleOk() {
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild(vm.$el); //删除全局注册
        }
      }
    });
    //插入到body
    document.body.appendChild(vm.$el);
  };
})();
