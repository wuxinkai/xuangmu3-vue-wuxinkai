# sell

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### vuex 的流程线路图

```
# (1)下载
npm install vuex --save

# (2)引入
import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{
        show:false
    }
})

# (3)在main.js引入
import store from './store'
new Vue({
  el: '#app',
  router,
  store,       //使用store
  template: '<App/>',
  components: { App }
})

# (4)在同级找到store文件夹中的index.js
import Vue from 'vue'
import Vuex from 'vuex'

//4.1 引入自己需要的小的模块
import affairs from './modules/vueElement/vuexTable'
Vue.use(Vuex)

 除了 state 是分模块的，其他 mutations 和 actions 都不分模块，因此规划的时候要注意不要重名！
const store = new Vuex.Store({
  modules: {
//4.2在模块中声明属性，便于查找
    affairs,
  },
})
export default store

# (5)在/modules/vueElement/vuexTable 下的vuexTable.js中
import { getTableList } from "@/api/vueElement/tableApi";
const vuesAccount = {
  state: {
    AffairsData: [],
  },
  getters: {
    getTableList: state => { }
  },
  mutations: {},
  actions: {
    getTableListClick({ commit }, params) {}
  }
};
export default vuesAccount;

# (6)在src/api/vueElement/tableApi 的tableApi.js中进行数据请求
import http from '@/utils/httpAxios'
import { baseHref } from '@/api/server.ip'

function resorve(path){
  return baseHref + path
}
export function getTableList(params){ //进行 ajax请求
return http.ajax({ url: resorve   ('/example/tableData'), method: 'POST' }, params)
}
```

### 子组件获取父组件的内容(加载获取)

```
(1)在html上写上自定义属性，用 ":"
<props-child :qianduan='ParentObj' ></props-child>

(2)在js中赋值
data() {
    return {
      ParentObj: [
        { bootstrap: "子组件获取父组件内的值" },
        { bootstrap: "第一名bootstrap" },
      ]
    };
  },

(3)在子组件中获取值 props接收父组件的值
export default {
  props: ["qianduan"],
  data(){
      return{
          a:"1"
      }
  },
};
（4）将值绑定到子界面
<ul>
     <li v-for="a in qianduan " :key="a">{{a.bootstrap}}</li>
</ul>
```

### 子组件 (通过事件) 获取父组建的 值 通过 this.\$parent.parentMsg

```
(1)子组件 html引入
<el-button  type="danger" @click="getParentData"> 获取父组件上的值</el-button>

（2）子组件 事件引入
 //这是子元素调用父元素上的数据
getParentData() {
    this.$set(this, 'parentData', this.$parent.parentMsg)
},

（3）父组件
export default {
  data() {
    return {
        parentMsg: '这是父元素数据被子元素调用',
    };
  },
}
```

###  子组件调用父组件事件

```
* vue是单向数据流，子事件无法修改，父组件的值，只能调用父组件方法修改父组件的值
(1)父组件 自定义事件，用 @
<props-child @child-msg='things'></props-child>

（2）父组件写事件
export default {
  data() {
    return {
      money: 400,
    };
  },
  methods: {
    things(val) {
      this.money = val;
    }
  },
}

(3) 子组件点击事件
<button @click="getMoney"> 点击触发父组件事件，400改成800</button>

(4) 子组建 发送事件
  methods:{
      getMoney(){
          this.$emit('child-msg',800)
      }
  }
};
```

### 父组件获取 子组件的值 （事件获取），

```
（1）父组件 html的引入
<el-button @click="getChildData">（调用data）获取子组件中的中data里的msg</el-button><span>: {{childMsg}}</span>

（2）父组件  js的引入
getChildData(){
    for (let child of this.$children) {
    // child 就相当于子组件
    // child.$options.name 获取的是当前子组件的  name: "refsChild_in"
    // 上面会有按钮组件
    if(child.$options.name =='refsChild_in'){ //el-button 也是一个组件所有需要判断
        this.$set(this, 'childMsg', child.msg) //给this添加自定义属性，
    }
}

(3) 子组件 需要name 和 msg
export default {
  name: "refsChild_in", //不能删除 在父组件有应用到, 父组件调用子组件数据
  data(){
      return{
          msg:'这是传递到父组件的值通过 ',
      }
  },
};
},
```

### 父组件 调用子组件里面的事件

```
(1)在指令上增加ref
 <props-child ref="parenClick"></props-child>

（2）父组件thml
 <el-button type="primary" @click="fuDiaoZiShiJian">点击关闭子组件的内容和传值</el-button>

 （3）父组件js
    //父组件调用子组件事件
fuDiaoZiShiJian() {
    this.$refs.parenClick.childHide();
},

（4）子组件
    //被父自己调用
    childHide(){
        this.flag =false; //修改子组件的内容
        this.text ='子内容被修改';
    },
```

### 兄弟组件的 传送数据

```
（1）在vue-AnLi/vueWuxinkai/src/main.js中设置
new Vue({
  el: '#app',
  data() {
    return {
      bus: new Vue(),
    }
  }
}).$mount('#app')

（2）在vueWuxinkai/src/components/common/bus.js 声明js

（3）在哥哥js中
<template>
    <div class="box">
        <div class="hezi" v-show="changingOver"></div>
        <br>
        <el-button type="" @click="changingChage">点击事件传递给兄弟组件</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            changingOver:true
        }
    },
    methods:{
        changingChage(){
            this.changingOver = !this.changingOver;
            //发送事件
            this.$root.bus.$emit('changingOver', this.changingOver)
        }
    }
}
</script>

（4）在弟弟页面
<template>
    <div class="box">
        <div class="heziNext " v-show="changingOver"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      changingOver: true
    };
  },
  created() { //接收数据
    this.$root.bus.$on("changingOver", msg => {
      console.log(msg);
      this.changingOver = msg;
    });
  }
};
</script>
```

## 父组件和 孙子组件的 v-bind="$attrs" v-on="$listeners"

```
  <childC class="888" v-bind="$attrs" v-on="$listeners"></childC>

```

必填属性 inheritAttrs: false

```
export default {

  data() {
    return {
      msg: "儿子组件"
    }
  },
  components: {
    childC,
  },
  inheritAttrs: false, //必填
    methods: {
    toParent() {
      this.$emit('test1', this.msg); //发送事假
    },
  }
};
```

接收 数据

```

```

## 插件的引入方式

### 图片预览

```
下载
cnpm install vue-photo-preview

引入main.js
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview, options)

HTML中
//在img标签添加preview属性 preview值相同即表示为同一组
<img src="static/images/head_icon.jpg" preview="2" preview-text="描述文字">
```

图片预览网站
!http://npm.taobao.org/package/vue-photo-preview

### Quill 编辑器

```
下载
npm install vue-quill-editor --save

引入
import vueQuillEditor from 'vue-quill-editor'
Vue.use(vueQuillEditor)

html 中引入
<quill-editor class="quill" v-model="progs"  @change="change"> </quill-editor>
```

Quill 编辑器官网 https://surmon-china.github.io/vue-quill-editor/

遇到的问题 ：上传图片

### tinymce 编辑器

```
拷贝文件components下Tinymce文件到自己的目录下

在页面以组件的方式引入
import Tinymce from '@/components/Tinymce'
components: {
    Tinymce
  }

html引入，
<tinymce :height="300" :readonly=readOnly v-model="newEntity"></tinymce>
```

### 百度地图

```
下载
npm install vue-baidu-map --save

引入在 main.js中
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '百度地图钥匙'
})
在页面中 引入
<template>
  <baidu-map class="bm-view">
  </baidu-map>
</template>

css必须设置高度
.map {
  width: 100%;
  height: 300px;
  background: #ccc;
}
```

百度地图 https://dafrok.github.io/vue-baidu-map/#/zh/overlay/marker

### highchart 图

```
下载 vue-highcharts 依赖highcharts ,
npm install highcharts --save
npm i vue-highcharts

引入
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';

//按需要加载这些模块
import loadStock from 'highcharts/modules/stock';
import loadMap from 'highcharts/modules/map';
import loadDrilldown from 'highcharts/modules/drilldown';

import loadHighchartsMore from 'highcharts/highcharts-more';
import loadSolidGauge from 'highcharts/modules/solid-gauge';
import highcharts3d from "highcharts/highcharts-3d";

loadStock(Highcharts);
loadMap(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);
highcharts3d(Highcharts);
Vue.use(VueHighcharts, { Highcharts });

html 的引入
 <highcharts :options="options"></highcharts>

js的引入
export default {
  data() {
    return {
      width: 500,
      height: 500,
      options: {
        chart: {
          type: 'pie',
          options3d: { //设置3D
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        title: {
          text: '2014年某网站不同浏览器访问量占比'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
          type: 'pie',
          name: '浏览器占比',
          data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
            },
            ['火狐', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
          ]
        }]
      }
    }
  }
}
```

highchart 图 https://www.hcharts.cn/demo/highcharts

### echarts 图

```
(1)下载，不需要引入echarts.js
npm i vue-echarts

(2)引入, 版本不同需要引入的路径不同
// import ECharts from 'vue-echarts'  //不好使
import ECharts from 'vue-echarts/components/ECharts'

(3)引入工具，需要什么引入什么 ，标题 图例 地理坐标系组件 时间轴
import 'echarts/lib/component/tooltip' //提示框
require('echarts/lib/component/toolbox'); //工具箱  通过require的引入方式

(4)引入图形
import 'echarts/lib/chart/pie' // 饼图
import 'echarts/lib/chart/bar' //2 柱状图

(5)初始化数据存放内容，放在一个页面过内容过多
import pie from './data/pie' // 饼图

(6)自定义主题渲染
import theme from './data/theme.json'
ECharts.registerTheme('ovilia-green', theme)

export default {
  data() {
    //(7)初始化配置
    let options = qs.parse(location.search, { ignoreQueryPrefix: true }) //是否忽略前面的 符号
    return{
      //(8)初始化
      options,
      initOptions: { //模式svg模式 或 者是canvas模式
        renderer: options.renderer || 'canvas'
      },
      // (9)引入图形
      pie
    }
  },
    components: {
    chart: ECharts, //(10)组件 声明
  },
}

html 引入
<chart class="chartHW" :options="pie" :init-options="initOptions" ref="pie" auto-resize />

css 必须设置高度
.charHW{
  width:100%;
  height:200px
}
```

问题：

- 引入的路径和版本相关，
- 图形不渲染颜色 和属性相关
- v-echart 和 vue-echarts 不一样

echart 图 https://www.npmjs.com/package/vue-echarts

### 动态设置页面高度；和控制底部表格高度

### 监听画布变化，单独控制 element 表头样式

### 全局设置页面样式

在 windowsHeight.js 中

### 增加组件 配合页面开发

/Users/wuxinkai/Documents/mongoDB/bin/mongod --dbpath /Users/wuxinkai/Documents/mongoDB/data/db

# 利用 vue-reource 请求数据

# cli3.0 加载图标必须用 require（）

```
 <img :src="getImgUrl(item.icon)" class="my-icon my-icon-a" alt="">

getImgUrl(icon){
  //字符串拼接不成功用require（）实现
  // return require("static/images/A_command.png")
  return `static/images/A_${icon}`
},
```

# axios 解决跨域

vueWuxinkai/config/index.js

```
proxyTable: {
    "/api": {
        target: "https://zhuanlan.zhihu.com", //要跨域的网址
        changeOrigin: true, //是否跨域
        // secure: false, //如果是https接口，需要配置这个参数
        pathRewrite: {
            "^/api": "/"
        }
    }
},
```

vueWuxinkai/config/dev.env.js

```
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST: "/api/"  //开发环境
})
```

vueWuxinkai/config/prod.env.js

```
module.exports = {
    NODE_ENV: '"production"',
    API_HOST: '"https://zhuanlan.zhihu.com"'//生产环境
}
```

vue-AnLi/vueWuxinkai/src/main.js

```
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api' //关键代码
Vue.config.productionTip = false
```

# Excel 下载

```
npm install --save file-saver
```

下载事件

```
async downLoad(data, title = 'download') {
      //创建文件
      debugger
      const workbook = new Excel.Workbook();
      //新建页签
      const sheet = workbook.addWorksheet('Sheet1');
      //如果是数组
      if (!isArray(data)) {  //isArray是 validate.js 的方法
        return;
      }
      sheet.addRow([...data]);
      const buffer = await workbook.xlsx.writeBuffer();
      const blod = new Blob([buffer], { type: this.EXCEL_TYPE });
      FileSaver.saveAs(blod, `${title}.xlsx`)
    }
```

# Excel 上传

```
npm install --save exceljs



```

转成数组对象

```
  change(e) {
      const files = e.target.files;
      let fileReader = new FileReader();

      fileReader.onload = async ev => {
        const data = ev.target.result;
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(data);
        let newdata = [] //数据 bbody
        let cols = []; //表头header
        workbook.eachSheet((worksheet, sheetId) => {
          //读写 Excel的第一页， 页签在excel的底部。
          if (sheetId == 1) {
            worksheet.eachRow((row, rowNumber) => {
              //第一行是列头
              if (rowNumber == 1) {
                row.eachCell(cell => {
                  cols.push(cell.value);
                });
              } else {
                let newrow = {};
                //第二行 读单元格
                row.eachCell((cell, colNumber) => {
                  Object.assign(newrow, {
                    [cols[colNumber - 1]]: cell.value
                  });
                });
                //加入行
                newdata.push(newrow);
              }
            });
            //触发事件
            this.$emit("readExcel", newdata, cols, worksheet, workbook);
          }
        })
      }
      fileReader.readAsBinaryString(files[0]);
    },
```

转成键值对方式

```

```
