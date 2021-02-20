/**
 * 此文件配置路由信息
 */
import Layout from "&/common/homePage"; //
export default [
  {
  path: "/HelloWorld",
  name: "HelloWorld",
  component: (resolve) => require(["@/components/HelloWorld"], resolve),
},
{ //单点登录
  path: "/agent",
  name: "agent",
  component: (resolve) => require(["@/Pages/agent.vue"], resolve),
  meta: {},
},
{
  path: "/",
  redirect: "/Home" //重定向
},
{
  path: "/Login",
  name: "Login",
  component: resolve => require(["#/Login.vue"], resolve),
  meta: {
    title: "首页",
    isUseCache: false,
    keepAlive: false
  }
},
{
  path: "/",
  component: resolve => require(["&/common/homePage"], resolve),
  meta: {
    title: "首页",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "/home",
    name: "Home",
    // 当你用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js。
    component: resolve => require(["#/user/user.vue"], resolve), //第四层内容部分
    meta: {
      title: "用户信息",
      isUseCache: false,
      keepAlive: false
    }
  }]
},
{
  path: "/vueRoute", //只有父元素可以加 / 子元素不能加 /  //链接路径
  name: "vueRoute", //路由名称，
  component: Layout, //路径入库 对应的组件模板
  name: "二级路由",
  // redirect: 'noredirect', //重定向 如果是这个就不跳转，这个给二级路由应用的
  meta: {
    title: "二级路由菜单",
    isUseCache: false, //是否缓存页面
    keepAlive: false
  },
  children: [{
    path: "routePath",
    name: "routePath",
    component: resolve => require(["#/vueRoute/routePath.vue"], resolve),
    meta: {
      title: "路由传参",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    },
    children: [{
      path: "routeSon1",
      name: "routeSon1",
      component: resolve =>
        require(["#/vueRoute/children/routeSon1.vue"], resolve),
      meta: {
        title: "query接收路由参数",
        isUseCache: false,
        keepAlive: false
      }
    },
    {
      path: "routeSon2",
      name: "routeSon2",
      component: resolve => require(["#/vueRoute/children/routeSon2.vue"], resolve),
      meta: {
        title: "params接收路由参数",
        isUseCache: false,
        keepAlive: false
      }
    }
    ]
  },
  {
    path: "routeHook",
    name: "routeHook",
    component: () =>
      import("#/vueRoute/routeHook"), //第二种引入方式
    meta: {
      title: "路由钩子函数",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    },
    children: [{
      path: "hookSon/:id", //动态路由
      name: "hookSon",
      component: resolve =>
        require(["#/vueRoute/children/hookSon.vue"], resolve),
      meta: {
        title: "钩子函数子页面",
        isUseCache: false,
        keepAlive: false
      },
      beforeEnter: (to, from, next) => {
        console.log("/router/index.js 里的beforeEnter");
        next(); //必须写
      },
      beforeLeave: (to, from, next) => {
        //不触发
        console.log("/router/index.js 里的beforeLeave");
        next(); //必须写
      }
    }]
  },
  {
    path: "routeStorage",
    name: "routeStorage",
    component: resolve =>
      require(["#/vueRoute/routeStorage.vue"], resolve),
    meta: {
      title: "路由缓存",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "keepAlives",
    name: "keepAlives",
    component: resolve => require(["#/vueRoute/keepAlives.vue"], resolve),
    meta: {
      title: "keepAlive的应用",
      isUseCache: false,
      keepAlive: true,
      breadcrumbLeft: true
    }
  },
  {
    path: "routeComp",
    name: "routeComp",
    component: resolve => require(["#/vueRoute/routeComp.vue"], resolve),
    meta: {
      title: "分配菜单内容",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    },
    children: [{
      path: "comp1",
      name: "comp1",
      component: resolve =>
        require(["#/vueRoute/comp/comp1.vue"], resolve),
      meta: {
        title: "父子菜单分离1",
        isUseCache: false,
        keepAlive: false
      }
    },
    {
      path: "comp2",
      name: "comp2",
      component: resolve =>
        require(["#/vueRoute/comp/comp2.vue"], resolve),
      meta: {
        title: "父子菜单分离2",
        isUseCache: false,
        keepAlive: false
      }
    },
    {
      path: "comp3",
      name: "comp3",
      component: resolve =>
        require(["#/vueRoute/comp/comp3.vue"], resolve),
      meta: {
        title: "父子菜单分离3",
        isUseCache: false,
        keepAlive: false
      }
    }
    ]
  }
  ]
},
{
  path: "/vueVitality",
  name: "vueVitality",
  component: Layout,
  name: "生命周期",
  meta: {
    title: "生命周期",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "computed",
    name: "computed",
    component: resolve =>
      require(["#/vueVitality/computed.vue"], resolve),
    meta: {
      title: "生命周期computed",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "watch",
    name: "watch",
    component: resolve => require(["#/vueVitality/watch.vue"], resolve),
    meta: {
      title: "生命周期watch",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "cycle",
    name: "cycle",
    component: resolve => require(["#/vueVitality/cycle.vue"], resolve),
    meta: {
      title: "生命周期",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "methods",
    name: "methods",
    component: resolve => require(["#/vueVitality/methods.vue"], resolve),
    meta: {
      title: "methods生命周期",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },

  {
    path: "filter",
    name: "filter",
    component: resolve => require(["#/vueVitality/filter.vue"], resolve),
    meta: {
      title: "过滤器",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "mounted",
    name: "mounted",
    component: resolve => require(["#/vueVitality/mounted.vue"], resolve),
    meta: {
      title: "mounted操作dom",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "subscribe",
    name: "subscribe",
    component: resolve =>
      require(["#/vueVitality/subscribe.vue"], resolve),
    meta: {
      title: "发布订阅模式",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "listener",
    name: "listener",
    component: resolve =>
      require(["#/vueVitality/listener.vue"], resolve),
    meta: {
      title: "父組件和孫子組件通訊",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "brother",
    name: "brother",
    component: resolve => require(["#/vueVitality/brother.vue"], resolve),
    meta: {
      title: "兄弟组件通信",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "target",
    name: "target",
    component: resolve => require(["#/vueVitality/target.vue"], resolve),
    meta: {
      title: "事件委托",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "fuzzySearch",
    name: "fuzzySearch",
    component: resolve => require(["#/vueVitality/fuzzySearch.vue"], resolve),
    meta: {
      title: "模糊搜索",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "slot",
    name: "slot",
    component: resolve => require(["#/vueVitality/slot.vue"], resolve),
    meta: {
      title: "发布订阅模式",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "lifeCycle",
    name: "lifeCycle",
    component: resolve => require(["#/vueVitality/lifeCycle.vue"], resolve),
    meta: {
      title: "生命周期的执行过程",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "effect",
    name: "effect",
    component: resolve => require(["#/vueVitality/effect.vue"], resolve),
    meta: {
      title: "vue属性作用",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "useMiXin",
    name: "useMiXin",
    component: resolve => require(["#/vueVitality/useMiXin.vue"], resolve),
    meta: {
      title: "useMiXin",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }
  ]
},
{
  path: "/Interview",
  name: "Interview",
  component: Layout,
  name: "面试",
  meta: {
    title: "面试",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "vueTopic1",
    name: "vueTopic1",
    component: resolve => require(["#/Interview/vueTopic1.vue"], resolve),
    meta: {
      title: "vue动画",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }, {
    path: "transition",
    name: "transition",
    component: resolve => require(["#/Interview/transition.vue"], resolve),
    meta: {
      title: "vue面动画",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }]
},
{
  path: "/table",
  name: "table",
  component: Layout,
  name: "element-ui",
  meta: {
    title: "element-ui",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "tableVisible",
    name: "tableVisible",
    component: resolve => require(["#/vueElement/table.vue"], resolve),
    meta: {
      title: "表格",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "tableDemo",
    name: "tableDemo",
    component: resolve =>
      require(["#/vueElement/tableDemo.vue"], resolve),
    meta: {
      title: "表格分页",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "exportTable",
    name: "exportTable",
    component: resolve =>
      require(["#/vueElement/exportTableToExcel.vue"], resolve),
    meta: {
      title: "表格分页",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
    // {
    //   path: "model",
    //   name: "model",
    //   component: resolve =>
    //     require(["#/vueElement/model.vue"], resolve),
    //   meta: {
    //     title: "模态框",
    //     isUseCache: false,
    //     keepAlive: false,
    //     breadcrumbLeft: true //自定义属性
    //   }
    // }
  ]
},
{
  path: "/vuePublic",
  name: "vuePublic",
  component: Layout,
  name: "公用组件",
  meta: {
    title: "公用组件",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "map1",
    name: "map1",
    component: resolve => require(["#/vuePublic/map1.vue"], resolve),
    meta: {
      title: "百度地图",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueSvgTab",
    name: "vueSvgTab",
    component: resolve => require(["#/vuePublic/vueSvgTab.vue"], resolve),
    meta: {
      title: "vue云标签",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "highcharts",
    name: "highcharts",
    component: resolve => require(["#/vuePublic/highcharts.vue"], resolve),
    meta: {
      title: "highcharts",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "tinymce",
    name: "tinymce",
    component: resolve => require(["#/vuePublic/tinymce.vue"], resolve),
    meta: {
      title: "tinymce编辑器",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueQuillEditor",
    name: "vueQuillEditor",
    component: resolve =>
      require(["#/vuePublic/vueQuillEditor.vue"], resolve),
    meta: {
      title: "vueQuillEditor编辑器",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueTabs",
    name: "vueTabs",
    component: resolve => require(["#/vuePublic/vueTabs.vue"], resolve),
    meta: {
      title: "图片懒加载",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueLazyload",
    name: "vueLazyload",
    component: resolve => require(["#/vuePublic/vueLazyload.vue"], resolve),
    meta: {
      title: "tab切换的原理",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "preview",
    name: "preview",
    component: resolve => require(["#/vuePublic/preview.vue"], resolve),
    meta: {
      title: "preview图片预览",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "translate",
    name: "translate",
    component: resolve => require(["#/vuePublic/translate.vue"], resolve),
    meta: {
      title: "中英翻译",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "recursion",
    name: "recursion",
    component: resolve => require(["#/vuePublic/recursion.vue"], resolve),
    meta: {
      title: "递归组件的应用",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "resizeDom",
    name: "resizeDom",
    component: resolve => require(["#/vuePublic/resizeDom.vue"], resolve),
    meta: {
      title: "动态设置页面高度",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "scaleZoom",
    name: "scaleZoom",
    component: resolve => require(["#/vuePublic/scaleZoom.vue"], resolve),
    meta: {
      title: "缩放设置页面高度",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "parentChild",
    name: "parentChild",
    component: resolve =>
      require(["#/vuePublic/parentChild.vue"], resolve),
    meta: {
      title: "父子组件在同一页面",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "timeElectronic",
    name: "timeElectronic",
    component: resolve =>
      require(["#/vuePublic/timeElectronic.vue"], resolve),
    meta: {
      title: "电子时间",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "iframe",
    name: "iframe",
    component: resolve =>
      require(["#/vuePublic/iframe.vue"], resolve),
    meta: {
      title: "iframe嵌套和跨域",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueCodemirror",
    name: "vueCodemirror",
    component: resolve =>
      require(["#/vuePublic/vueCodemirror.vue"], resolve),
    meta: {
      title: "vueCodemirror插件学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueWeather",
    name: "vueWeather",
    component: resolve =>
      require(["#/vuePublic/vueWeather.vue"], resolve),
    meta: {
      title: "天气预报",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueBanner",
    name: "vueBanner",
    component: resolve =>
      require(["#/vuePublic/vueBanner.vue"], resolve),
    meta: {
      title: "轮播图",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueBanner2",
    name: "vueBanner2",
    component: resolve =>
      require(["#/vuePublic/vueBanner2.vue"], resolve),
    meta: {
      title: "轮播图",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }
  ]
},
{
  path: "/directive",
  name: "directive",
  component: Layout,
  name: "内置指令",
  meta: {
    title: "内置指令",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "vueAttribute",
    name: "vueAttribute",
    component: resolve =>
      require(["#/directive/vueAttribute.vue"], resolve),
    meta: {
      title: "指令",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }, {
    path: "vueDir",
    name: "vueDir",
    component: resolve =>
      require(["#/directive/vueDir.vue"], resolve),
    meta: {
      title: "自定义指令",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "vueTodo",
    name: "vueTodo",
    component: resolve =>
      require(["#/directive/vueTodo.vue"], resolve),
    meta: {
      title: "增删改查案例",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }
  ]
},
{
  path: "/vueComm",
  name: "vueComm",
  component: Layout,
  name: "通用组件",
  meta: {
    title: "通用组件",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "timer",
    name: "timer",
    component: resolve => require(["#/vueComm/timer.vue"], resolve),
    meta: {
      title: "页面跳转关闭定时器",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "timerChiid",
    name: "timerChiid",
    component: resolve => require(["#/vueComm/timerChiid.vue"], resolve),
    meta: {
      title: "页面的子页面",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "busUsed",
    name: "busUsed",
    component: resolve => require(["#/vueComm/busUsed.vue"], resolve),
    meta: {
      title: "兄弟页面的事件调用",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }
  ]
},
{
  path: "/vuex",
  name: "vuex",
  component: Layout,
  name: "vuex学习",
  meta: {
    title: "vuex学习",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "vuexExample",
    name: "vuexExample",
    component: resolve => require(["#/vuex/vuexExample.vue"], resolve),
    meta: {
      title: "vuex学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }, {
    path: "vuexExample2",
    name: "vuexExample2",
    component: resolve => require(["#/vuex/vuexExample2.vue"], resolve),
    meta: {
      title: "数据持久化",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },]
},
{
  path: "/css3",
  name: "css3",
  component: Layout,
  name: "css3学习",
  meta: {
    title: "css3学习",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "css3",
    name: "css3",
    component: resolve => require(["#/css3/css3.vue"], resolve),
    meta: {
      title: "css3学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "cssMethod",
    name: "cssMethod",
    component: resolve => require(["#/css3/cssMethod.vue"], resolve),
    meta: {
      title: "css常用方法",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },
  {
    path: "responsive",
    name: "responsive",
    component: resolve => require(["#/css3/responsive.vue"], resolve),
    meta: {
      title: "css响应式设计",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }
  ]
},
{
  path: "/tuozhuai",
  name: "tuozhuai",
  component: Layout,
  name: "拖拽插件",
  meta: {
    title: "拖拽插件",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "drag",
    name: "drag",
    component: resolve => require(["#/tuozhuai/drag.vue"], resolve),
    meta: {
      title: "拖拽",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    },
  }, {
    path: "dragZone",
    name: "dragZone",
    component: resolve => require(["#/tuozhuai/dragZone.vue"], resolve),
    meta: {
      title: "拖拽dragZone",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    },
  }, {
    path: "drop",
    name: "drop",
    component: resolve => require(["#/tuozhuai/drop.vue"], resolve),
    meta: {
      title: "自定义拖拽",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    },
  }]
},
{
  path: "/map",
  name: "map",
  component: Layout,
  name: "echarts地图的应用学习",
  meta: {
    title: "echarts的应用",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "echartsIn",
    name: "echartsIn",
    component: resolve => require(["#/map/echartsIn.vue"], resolve),
    meta: {
      title: "v-echarts图学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "echartsXiaZuan",
    name: "echartsXiaZuan",
    component: resolve => require(["#/map/echartsXiaZuan.vue"], resolve),
    meta: {
      title: "地图下钻到县级",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }, {
    path: "echartsStars",
    name: "echartsStars",
    component: resolve => require(["#/map/echartsStars.vue"], resolve),
    meta: {
      title: "新浪星星信息图",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }
  ]
},
{
  path: "/elementUi",
  name: "elementUi",
  component: Layout,
  name: "element知识点",
  meta: {
    title: "element知识点",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "model",
    name: "model",
    component: resolve => require(["#/elementUi/model.vue"], resolve),
    meta: {
      title: "学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  },
  {
    path: "wenTi",
    name: "wenTi",
    component: resolve => require(["#/elementUi/wenTi.vue"], resolve),
    meta: {
      title: "学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true //自定义属性
    }
  }
  ]
},
{
  path: "/potting",
  name: "potting",
  component: Layout,
  meta: {
    title: "potting",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "encapsulation",
    name: "encapsulation",
    component: resolve => require(["#/potting/encapsulation.vue"], resolve),
    meta: {
      title: "学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "toduList",
    name: "toduList",
    component: resolve => require(["#/potting/toduList.vue"], resolve),
    meta: {
      title: "学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "vueFind",
    name: "vueFind",
    component: resolve => require(["#/potting/vueFind.vue"], resolve),
    meta: {
      title: "将两个数组联系一起",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "globalMessage",
    name: "globalMessage",
    component: resolve => require(["#/potting/globalMessage.vue"], resolve),
    meta: {
      title: "写js组件不用引入vue代码",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },]
},
{
  path: "/threeFolder",
  name: "threeFolder",
  component: Layout,
  meta: {
    title: "three学习",
    isUseCache: false,
    keepAlive: false
  },
  children: [
    {
    path: "ModelIndex",
    name: "ModelIndex",
    component: resolve => require(["#/threeFolder/ModelIndex.vue"], resolve),
    meta: {
      title: "模型",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, 
  {
    path: "threedome1",
    name: "threedome1",
    component: resolve => require(["#/threeFolder/threedome1.vue"], resolve),
    meta: {
      title: "基础学习",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  },{
    path: "threedome2",
    name: "threedome2",
    component: resolve => require(["#/threeFolder/threedome2.vue"], resolve),
    meta: {
      title: "three的封装",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "zuobiaoxi",
    name: "zuobiaoxi",
    component: resolve => require(["#/threeFolder/zuobiaoxi.vue"], resolve),
    meta: {
      title: "坐标系",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "zuobiaozhouxuanzhuan",
    name: "zuobiaozhouxuanzhuan",
    component: resolve => require(["#/threeFolder/zuobiaozhouxuanzhuan.vue"], resolve),
    meta: {
      title: "坐标系旋转",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "tweenAndStats",
    name: "tweenAndStats",
    component: resolve => require(["#/threeFolder/tweenAndStats.vue"], resolve),
    meta: {
      title: "动画和监控",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }, {
    path: "zoom",
    name: "zoom",
    component: resolve => require(["#/threeFolder/zoom.vue"], resolve),
    meta: {
      title: "动画和监控",
      isUseCache: false,
      keepAlive: false,
      breadcrumbLeft: true
    }
  }]
},
{
  path: "/es6",
  name: "es6",
  component: Layout,
  meta: {
    title: "se6",
    isUseCache: false,
    keepAlive: false
  },
  children: [{
    path: "es01",
    name: "es01",
    meta: {
      title: "01",
      isUseCache: false,
      keepAlive: false
    },
    component: resolve => require(["#/es6/es01.vue"], resolve),
  },
  {
    path: "async_await",
    name: "async_await",
    meta: {
      title: "async_await",
      isUseCache: false,
      keepAlive: false
    },
    component: resolve => require(["#/es6/async_await.vue"], resolve)
  }
  ]
}]
