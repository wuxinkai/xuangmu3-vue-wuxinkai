import Vue from "vue";

let message_box = require("./message/index.vue").default;
let message = {};
message.install = (Vue, options) => {
  if (document.getElementsByClassName(".message-box").length) return; //只能有一个
  //创建一个构造器
  var MyComponent = Vue.extend(message_box);
  //方法写在原型上
  Vue.prototype.$global_message = {
    handleShowMessage(opts) {
      // vue实例化
      let vm = new MyComponent({
        el: document.createElement("div"), // 只在用 new 创建实例时生效  创建一个容器装载我的的弹出框，
        data: {
          //vm.$data 访问原始数据对象 因此访问 vm.a 等价于访问 vm.$data.a
          title: opts.title,
          content: opts.content,
          cancel: opts.cancel,
          ok: opts.ok,
        },
        methods: {
          //关闭事件
          handleCancle() {
            opts.handleCancle && opts.handleCancle.call(this); //调用原型上的方法
            document.body.removeChild(vm.$el);
          },
          //确认
          handleOk() {
            opts.handleOk && opts.handleOk.call(this);
            document.body.removeChild(vm.$el);
          }
        }
      });
      document.body.appendChild(vm.$el);
    }
  };
};

//导出组件
export default message;
