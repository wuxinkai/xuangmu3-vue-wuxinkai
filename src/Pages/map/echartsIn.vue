<template>
  <div class="FU">
    <div>
      <p>引入echarts的</p>
      <p>（1）npm install vue-echarts 在node_modules查看版本是否引入进来</p>
      <p>（2）import ECharts from 'vue-echarts/components/ECharts'，或者用import ECharts from 'vue-echarts 这里是个坑</p>
      <p>（3）import 'echarts/lib/chart/bar' //引入图形</p>
      <p>（4）import 'echarts/lib/component/tooltip' //引入工具</p>
      <p>（5）import getBar from './data/peopleBar' //数据组件化</p>
      <p>（6）在data里面初始化 //初始化数据</p>
      <p>（6）' chart :options="pie" :init-options="initOptions" ref="pie"'// 引入html标签</p>
    </div>
    <br>
    <el-row>
      <!-- offset 偏移量 大于就的让他向左便宜1个-->
      <div class="clear">
        <el-col class="fff" :span="7">
          <el-card :body-style="{ padding: '0px' }">
            <div class="headerTitle">
              定时器 饼图的引入和应用
            </div>
            <chart class="chartHW" :options="pie" :init-options="initOptions" ref="pie" auto-resize />
            <div style="padding: 14px;">
              <span>饼图</span>
            </div>
          </el-card>
        </el-col>
        <el-col class="fff" :span="7" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <div class="headerTitle">
              柱状图加载生成随机数
            </div>
            <figure>
              <chart class="chartHW" :options="barData" :init-options="initOptions" ref="barData" theme="ovilia-green" auto-resize />
            </figure>
            <div style="padding: 14px;text-align: center">
              <p v-if="seconds <= 0">
                <small>加载完成.</small>
              </p>
              <p v-else>
                <small>数据输入
                  <b>{{ seconds }}</b> 这个{{ seconds > 1 ? '未完成' : '已完成' }}...</small>
              </p>
              <p>
                <button @click="refresh" :disabled="seconds > 0">生成随机数</button>
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col class="fff" :span="7" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <div class="headerTitle">
              折线图切换主题
            </div>
            <figure :style="polarTheme === 'dark' ? 'background-color: #333' : ''">
              <chart class="chartHW" :options="polar" :init-options="initOptions" :theme="polarTheme" auto-resize />
            </figure>
            <div style="padding: 14px;">
              <p>
                <select v-model="polarTheme">
                  <option :value="null">Default</option>
                  <option value="dark">Dark</option>
                </select>
              </p>
            </div>
          </el-card>
        </el-col>
      </div>
      <div class="clear">
        <el-col class="fff" :span="7">
          <div class="headerTitle">
            散点图
          </div>
          <el-card :body-style="{ padding: '0px' }">
            <chart class="chartHW" :options="scatter" :init-options="initOptions" auto-resize />
          </el-card>
        </el-col>
        <el-col class="fff" :span="7" :offset="1">
          <div class="headerTitle">
            地图 加截图功能
          </div>
          <el-card :body-style="{ padding: '0px' }">
            <chart class="chartHW" :options="map" :init-options="initOptions" ref="map" auto-resize />
          </el-card>
          <div>
            <p style="text-align: center">
              <button @click="convert">截图功能</button>
            </p>
          </div>
          <aside :class="{ modal: true, open }" @click="open = false">
            <img v-if="img.src" :src="img.src" :width="img.width">
          </aside>
        </el-col>
        <el-col class="fff" :span="7" :offset="1">
          <div class="headerTitle">
            vuex请求数据，设置每个属性的 多少
          </div>
          <el-card :body-style="{ padding: '0px' }">
            <figure>
              <chart class="chartHW" :options="scoreRadar" :init-options="initOptions" auto-resize />
            </figure>
            <p>
              <select v-model="metricIndex">
                <option v-for="(metric, index) in metrics" :value="index" :key="index">{{ metric }}
                </option>
              </select>
              <button @click="increase(1)" :disabled="isMax">增加1个</button>
              <button @click="increase(-1)" :disabled="isMin">减少1个</button>
              <input id="async" type="checkbox" v-model="asyncCount">
              <label for="async">异步修改状态</label>
            </p>
          </el-card>
        </el-col>
      </div>
      <div class="clear">
        <el-col class="fff" :span="7">
          <div class="headerTitle">
            c1和c2数据连动
          </div>
          <el-card :body-style="{ padding: '0px' }">
            <figure class="half">
              <chart class="chartHW" :options="c1" :init-options="initOptions" group="radiance" ref="c1" auto-resize />
            </figure>
          </el-card>
        </el-col>
        <el-col class="fff" :span="1">
          <el-card :body-style="{ padding: '0px' }" style="margin-top:100px">
            <label>
              <input type="checkbox" v-model="connected"> 连接来个数据
            </label>
          </el-card>
        </el-col>
        <el-col class="fff" :span="7">
          <div class="headerTitle">
            c1和c2数据连动
          </div>
          <el-card :body-style="{ padding: '0px' }">
            <figure class="half">
              <chart class="chartHW" :options="c2" :init-options="initOptions" group="radiance" ref="c2" auto-resize />
            </figure>
          </el-card>
        </el-col>
        <el-col class="fff" :span="7" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <div class="headerTitle">
              fetch 本地请求，和手动加载数据
            </div>
            <figure class="half">
              <chart class="chartHW" ref="flight" :init-options="initOptions" :options="flightOptions" auto-resize />
            </figure>
            <p>
              <button :disabled="flightLoaded" @click="loadFlights">加载数据</button>
            </p>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
import Vue from 'vue'

// import ECharts from 'vue-echarts'
import ECharts from 'vue-echarts/components/ECharts'
// 工具

import 'echarts/lib/component/tooltip' //提示框
require('echarts/lib/component/toolbox'); //工具箱  require是另一种引入方式
require('echarts/lib/component/title'); //标题
import 'echarts/lib/component/legend' //图例
import 'echarts/lib/component/polar' //极坐标系，可以用于散点图和折线图
import 'echarts/lib/component/geo' //地理坐标系组件。
import 'echarts/lib/component/timeline' // 时间轴
import 'echarts/lib/component/visualMap' // visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
import 'echarts/lib/component/dataset' //ECharts 4 开始支持了 数据集（dataset）组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以自由指定数据到视觉的映射。这在不少场景下能带来使用上的方便。
import 'echarts/map/js/world' //地图专业
//需要哪些插件引入那些插件
import 'echarts/lib/chart/pie' // 1饼图
import 'echarts/lib/chart/bar' //2 柱状图
import 'echarts/lib/chart/line' // 3折线图
import 'echarts/lib/chart/scatter' //4散点图
import 'echarts/lib/chart/effectScatter' //地图气泡
import 'echarts/lib/chart/map' //5地图
import 'echarts/lib/chart/radar' //6 雷达图，通过vuex获取 内容都写在  store/echart/radar.js里面


//配置存放位置
import pie from './data/pie' //1.1 饼图
import getBar from './data/bar' //2.1 柱状图 调用bar.js里的getBar方法
import polar from './data/polar' //3.1 折线图
import scatter from './data/scatter' //4.1散点图
import map from './data/map' //5.1地图

import { c1, c2 } from './data/connect' //7 数据连动效果

//5.2中国地图 map组件
import chinaMap from './data/china.json'
//5.3注册地图数据
ECharts.registerMap('china', chinaMap)

// built-in theme  内置主题
// import 'echarts/theme/dark'
// 自定义主题渲染
import theme from './data/theme.json'
ECharts.registerTheme('ovilia-green', theme)

export default {
  data() {
    //将qs解析成对象的形式
    let options = qs.parse(location.search, { ignoreQueryPrefix: true }) //忽略前面的 符号
    return {
      // --------- 初始化 -----------
      options,
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      // -----------饼图----------
      pie,  //1.3 饼图初始化

      // -------------柱状图--------------------
      barData: getBar(), //2.3调用引入的方法
      seconds: -1, //2.4柱状图让其显示隐藏或者

      // --------------折线图-----------------
      polar,//3.2
      polarTheme: 'dark', //3.3
      // ---------------散点图------------
      scatter,
      // -------- 地图-------------
      map, //5.4
      open: false, //地图的截图功能
      img: {},
      // ---------雷达图-------------
      metricIndex: 0,
      asyncCount: false,
      // ---------数据连动-----------
      c1, //7.1
      c2, //7.2
      connected: true,
      //------------手动更新----------------
      flightOptions: null,
      flightLoaded: false,
    }
  },
  computed: {
    // 6.1获取雷达图的数据
    scoreRadar() {
      return this.$store.getters.scoreRadar
    },
    // 6.2获取雷达图的 名字
    metrics() {
      return this.$store.state.echartRadar.scores.map(({ name }) => name)
    },
    // 6.3获取雷达图的最大值
    isMax() {
      let { value, max } = this.$store.state.echartRadar.scores[this.metricIndex]
      return value === max
    },
    // 6.4获取雷达图的最小值
    isMin() {
      return this.$store.state.echartRadar.scores[this.metricIndex].value === 0
    }
  },
  methods: {
    //柱状图 点击重新加载数据
    refresh() {
      this.seconds = 3;
      let bar = this.$refs.barData; //获取内容
      console.log(bar)
      bar.showLoading({ //echarts中的组件
        text: '页面加载中…',
        color: '#4ea397',
        maskColor: 'rgba(255, 255, 255, 0.4)'
      })
      let timer = setInterval(() => {
        this.seconds-- //不断的减
        if (this.seconds === 0) {
          clearTimeout(timer) //清楚定时器
          bar.hideLoading()  //关闭 页面加载
          this.bar = getBar() //从新调用 柱状图方法
        }
      }, 1000)
    },
    //地图图片剪切全屏
    convert() {
      let map = this.$refs.map
      let { width, height } = map; //获取元素的宽高
      this.img = {
        src: map.getDataURL({
          pixelRatio: window.devicePixelRatio || 1
        }),
        width,
        height
      }
      this.open = true
    },
    //雷达图 修改数据
    increase(amount) {
      if (!this.asyncCount) { //是同步修改还是异步修改
        this.$store.commit('increment', { amount, index: this.metricIndex })
      } else {
        this.$store.dispatch('asyncIncrement', { amount, index: this.metricIndex, delay: 1500 })
      }
    },
    //红色地图加载
    loadFlights() {
      this.flightLoaded = true //禁用状态
      let { flight } = this.$refs //获取元素上的内容
      flight.showLoading({ //页面加载
        text: '',
        color: '#c23531',
        textColor: 'rgba(255, 255, 255, 0.5)',
        maskColor: '#003',
        zlevel: 0
      })
      // fetch('../static/flight.json') 
      //   .then(response => response.json()) 这种方式不用 手动 return 
      //   .then(data => {
      fetch('../static/json/flight.json') //本地请求方法
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          flight.hideLoading()
          function getAirportCoord(idx) {
            return [data.airports[idx][3], data.airports[idx][4]]
          }
          let routes = data.routes.map(function (airline) {
            return [
              getAirportCoord(airline[1]),
              getAirportCoord(airline[2])
            ]
          })
          this.flightOptions = ({
            title: {
              text: 'World Flights',
              left: 'center',
              textStyle: {
                color: '#eee'
              }
            },
            backgroundColor: '#003',
            tooltip: {
              formatter(param) {
                let route = data.routes[param.dataIndex]
                return data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
              }
            },
            geo: {
              map: 'world',
              left: 0,
              right: 0,
              silent: true,
              itemStyle: {
                normal: {
                  borderColor: '#003',
                  color: '#005'
                }
              }
            },
            series: [
              {
                type: 'lines',
                coordinateSystem: 'geo',
                data: routes,
                large: true,
                largeThreshold: 100,
                lineStyle: {
                  normal: {
                    opacity: 0.05,
                    width: 0.5,
                    curveness: 0.3
                  }
                },
                // 设置混合模式为叠加
                blendMode: 'lighter'
              }
            ]
          })
        })
    }
  },
  components: {
    chart: ECharts,
  },
  watch: { //散点图连动效果
    connected: {
      handler(value) {
        //echarts.connect（多个图表实例实现联动）；
        //echarts.disconnect（解除图表实例的联动，如果只需要移出单个实例，可以将通过将该图表实例group设为空）
        ECharts[value ? 'connect' : 'disconnect']('radiance')
      },
      //immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，
      //如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行。
      immediate: true
    }
  },
  mounted() { //计算属性
    //1.4饼图 定时转圈
    let dataIndex = -1
    let pie = this.$refs.pie //获取饼图上的属性
    let dataLen = pie.options.series[0].data.length; //获取多少个标题
    setInterval(() => {
      //echartsInstance.dispatchAction（触发图表行为，例如图表开关legendToggleSelect，
      // 数据区域缩放dataZoom，显示提示框showTip等等）；
      pie.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex
      })
      dataIndex = (dataIndex + 1) % dataLen
      pie.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
      // 显示 tooltip
      pie.dispatchAction({
        type: '',
        seriesIndex: 0,
        dataIndex
      })
    }, 1000)
  },
}
</script>
<style scoped>
.fff {
  background: #fff;
  padding-bottom: 10px;
}
.chartHW {
  height: 300px;
  width: 100%;
}

.clear {
  margin-top: 30px;
  overflow: hidden;
}
/*地图截图功能*/
.modal.open {
  display: block;
}
.modal {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.modal img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #404a59;
  max-width: 80vw;
  border: 2px solid #fff;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
button {
  border: 1px solid #4fc08d;
  border-radius: 2em;
  background-color: #fff;
  color: #42b983;
  cursor: pointer;
  font: inherit;
  transition: opacity 0.3s;
  font-size: 0.75em;
  padding: 2px 12px;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.headerTitle {
  font-weight: bold;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
