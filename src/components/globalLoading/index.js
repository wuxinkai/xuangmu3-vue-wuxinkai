import Vue from "vue";

//import 是静态编译的，而 require 可以动态加载，也就是说你可以通过判断条件来决定什么时候去 require ，
// import loadTemp from "./loading/index.vue";
let loadTemp = require("./loading/index.vue").default; // 在导出组件的时候应用到了

let Load = {}; // 定义插件对象

Load.install = (Vue, options) => {
  //如果页面存在loding 不重复创建DOm
  if (document.getElementsByClassName(".load-status").length) return; //不等于0 说明有 就直接return  不执行下面代码

  // 提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。
  // 在实例挂载之后，可以通过$vm.$el访问。
  // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译(如下)
  // 提供的元素只能作为挂载点。所有的挂载元素会被vue生成的dom替换。因此不能挂载在顶级元素(html, body)上
  // let $vm = new toastTpl({
  //  el: document.createElement('div')
  // })

  //创建一个构造器
  let lTemp = Vue.extend(loadTemp);
  
  // vue实例化
  let $vm = new lTemp();
  // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
  let tpl = $vm.$mount().$el;
  document.body.appendChild(tpl); //页面加载就插入dom
  Vue.prototype.$global_loading = {
    //在原型上增加实例方法，全局使用
    show(options) {
      // //通过传入props改变$vm下的属性控制组件 例如$vm.text = options
      if (options == "loading") {
        //两种loing
        $vm.showLoading = true;
      } else if (options == "toast") {
        $vm.showToast = true;
      }
    },
    hide() {
      $vm.showLoading = false;
      $vm.showToast = false;
    }
  };
};

//导出组件
export default Load;

//在你的src/main.js 注册
