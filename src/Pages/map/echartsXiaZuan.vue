<template>
  <div>
    <div>1，全国数据需要china.json，存放在</div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import Echarts from "echarts";
//省的名字
import provinceMap from './mapData/province-map';
//事的名字
import CityMap from "./mapData/city-map";
export default {
  data() {
    return {
      option: {
        //设置背景渐变色
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#0f2c70' // 0% 处的颜色
          }, {
            offset: 1, color: '#091732' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        geo: {
          map: 'china',
          zoom: 1,
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          },
        },
        title: {
          x: '20px',
          y: '20px',
          text: "",
          textStyle: {
            color: '#ccc',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 24
          }
        },
        series: [
          {
            type: "map",
            mapType: "china",
            selectedMode: "single",
            symbolSize: function (val) {
              return 104;
            },
            //设置颜色
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(100,149,237,0.6)',
                borderWidth: 0.5,
                areaColor: '',
                color: '#fff'
              },
              emphasis: {
                areaColor: 'rgba(128, 217, 248, .5)'
              }
            },
          },
        ]
      }
    }
  },
  computed: {

  },
  mounted() {
    //获取元素
    this.chart = Echarts.init(this.$refs.map);
    // 页面加载 没有数据的遮罩层 气泡状态
    this.chart.showLoading({ effect: 'bubble' });
    //请求的全国地图
    let DataJson = require('./mapData/china.json')
    //加载json数据
    Echarts.registerMap("china", DataJson);
    //设置图标类型
    this.option.geo.map = 'china';
    //设置数据类型
    this.option.series[0].mapType = 'china';
    //从新渲染页面
    this.chart.setOption(this.option);
    //点击事件
    this.chart.on("mapselectchanged", this.onProvinceClick);
    //关闭加载弹出层
    this.chart.hideLoading();
  },
  methods: {
    //点击下钻功能
    onProvinceClick(e) {
      //开启加载层
      this.chart.showLoading();
      //获取点击的是那个省
      let name = e.batch[0].name;
      //把省转为拼音
      let pinyinName = provinceMap[name]
      //获取拼音拼接地市
      let DataJson = require(`./mapData/province/${pinyinName}.json`)
      //渲染页面
      Echarts.registerMap(pinyinName, DataJson);
      this.option.geo.map = pinyinName;
      this.option.series[0].mapType = pinyinName;
      this.chart.setOption(this.option);
      //关闭当前点击事件，从全国跳到省里，关闭条到省里的事件
      this.chart.off("mapselectchanged", this.onProvinceClick);
      //打开下一级点击事件， 从省里跳到 市里
      this.chart.on("mapselectchanged", this.onCityClick);
      //关闭加载层
      this.chart.hideLoading();
    },
    //点击到县里
    async onCityClick(e) {
      this.chart.showLoading();
      let name = e.batch[0].name;
      var cityCode = CityMap[name];
      // let mapJson = await require(`./mapData/citys/${cityCode}.json`)
      let mapJson = await require(`./mapData/citys/${cityCode}.json`)
      Echarts.registerMap(name, mapJson);
      this.option.series[0].mapType = name;
      this.option.geo.map = name;
      this.chart.setOption(this.option);
      this.chart.off("mapselectchanged", this.onCityClick);
      this.chart.hideLoading();
    }
  },
}
</script>
<style>
.map {
  width: 800px;
  height: 800px;
}
</style>

