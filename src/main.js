// The Vue build version to load with the `import` command
// 在WebPACK.BASE.CONF中设置了别名（运行时单独或运行时）。
import Vue from "vue";
import App from "./App";
import router from "./router";
import $ from 'jquery'
import http from "./utils/httpAxios";

import store from "./store"; //vuex
import axios from "axios";

import VueLazyload from "vue-lazyload"; //（1111）图片懒加载

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

import ElementUI from "element-ui"; //element 内容
import "element-ui/lib/theme-chalk/index.css"; // element默认主题
import "./components/common/css/common.css"; //
//动画
import "vue2-animate/dist/vue2-animate.min.css";

import vueQuillEditor from "vue-quill-editor"; // 引入富文本工具
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(vueQuillEditor);

import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";



//自定义全局插件
//在你的main.js里通过以下方式引入组件
import globalLoading from './components/globalLoading'
//然后通过 USE方法全局注册
Vue.use(globalLoading);

import globalMessage from './components/globalMessage'
//然后通过 USE方法全局注册
Vue.use(globalMessage);

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(
  VueCodemirror /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */
);
// 解决跨域问题

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "/api"; //关键代码
Vue.config.productionTip = false;

//布局拖拽
import VueDragZone from "vue-drag-zone";
Vue.use(VueDragZone);
import preview from "vue-photo-preview"; //图片预览
import "vue-photo-preview/dist/skin.css";
var options = {
  fullscreenEl: false //关闭全屏按钮
};
Vue.use(preview, options); //图片预览

import i18n from "./lang";

import Filters from "./filters/filters"; //过滤器
for (let key in Filters) {
  Vue.filter(key, Filters[key]);
}

import loading from "../static/images/loading.gif";
import error_data from "../static/images/error.jpg";

// 222 图片懒加载配置
Vue.use(VueLazyload, {
  preLoad: 1.3, //预载高度比例
  error: error_data, //当加载图片失败的时候
  loading: loading, //当加载图片成功的时候
  attempt: 1, //尝试计数
 
});

import BaiduMap from "vue-baidu-map"; //引入百度地图

import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";

// load these modules as your need
import loadStock from "highcharts/modules/stock";
import loadMap from "highcharts/modules/map";
import loadDrilldown from "highcharts/modules/drilldown";
// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import loadHighchartsMore from "highcharts/highcharts-more";
import loadSolidGauge from "highcharts/modules/solid-gauge";
import highcharts3d from "highcharts/highcharts-3d";
import Axios from "axios";
loadStock(Highcharts);
loadMap(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);
highcharts3d(Highcharts);
Vue.use(VueHighcharts, {
  Highcharts
});
Vue.prototype.$ = $;
Vue.config.productionTip = false;

require("es6-promise").polyfill();
require("es6-promise/auto");

//(1)引入element-ui
Vue.use(ElementUI, {
  size: "small"
});

//http ajax请求的方法
Vue.prototype.http = http;

//引入百度地图
Vue.use(BaiduMap, {
  ak: "u8n7EbYE9SUmhF7WKOBu8xtbTDNiY9ex"
});

//设置页面缩放
// import zoom from '#/vuePublic/tool/zoom'
// zoom()
// window.addEventListener('resize', zoom)


//全局函数
Vue.prototype.globalFunc_one = function(data){
  alert(data)
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router, //引入路由
  store, //引入 vuex
  i18n, //切换语言
  // components: { App },
  // template: '<App/>',
  render: h => h(App),
  data() {
    return {
      bus: new Vue(), //创建一个实例，
      haha: "hahah",
      windowHeight: document.documentElement.clientHeight - 400 //设置子页面表格的高度
    };
  }
}).$mount("#app"); //挂载app，要保证有编译的元素
