<template>
  <div>
    <div>1，全国数据需要china.json，存放在</div>
    <div>2，引入echarts-gl, npm i echarts-gl --save</div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import Echarts from "echarts";
import Axios from "axios";
//引入echarts-gl w
require('echarts-gl');
//读取json数据
import StarsDta from "./json/StarsDta";
//引入全局地址

export default {
  data() {
    return {
      StarsDta: StarsDta,
      option: {
        color: ['rgba(255, 255, 255, 0.8)', 'rgba(14, 241, 242, 0.8)', 'rgba(37, 140, 249, 0.8)'],
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
        title: {
          text: '微博签到数据点亮中国',
          subtext: 'From ThinkGIS',
          left: 'center',
          top: 'top',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['强', '中', '弱'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          name: '强',
          roam: true,
          type: 'scatter',
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [{
          name: '弱',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(37, 140, 249, 0.8)',
              color: 'rgba(37, 140, 249, 0.8)'
            }
          },
          data: []
        }, {
          name: '中',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(14, 241, 242, 0.8)',
              color: 'rgba(14, 241, 242, 0.8)'
            }
          },
          data: []
        }, {
          name: '强',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
          large: true,
          itemStyle: {
            normal: {
              shadowBlur: 2,
              shadowColor: 'rgba(255, 255, 255, 0.8)',
              color: 'rgba(255, 255, 255, 0.8)'
            }
          },
          data: []
        }]
      }
    }
  },
  methods: {
    getStarsData(weiboData) {
      //数据太大，让其变小，小于0的与计算
      weiboData = weiboData.map(function (serieData, idx) {
        var px = serieData[0] / 1000;
        var py = serieData[1] / 1000;
          console.log(px,py);
        var res = [[px, py]];
        for (var i = 2; i < serieData.length; i += 2) {
          var dx = serieData[i] / 1000;
          var dy = serieData[i + 1] / 1000;
          var x = px + dx;
          var y = py + dy;
          res.push([x.toFixed(2), y.toFixed(2), 1]);
          px = x;
          py = y;
        }
        return res;
      });
      this.chart = Echarts.init(this.$refs.map);
      let DataJson = require('./mapData/china.json')
      Echarts.registerMap("china", DataJson);
      this.option.series[0].data = weiboData[0];
      this.option.series[1].data = weiboData[1];
      this.option.series[2].data = weiboData[2];
      this.chart.setOption(this.option);
      this.chart.resize(); //刷新数据
    }
  },
  mounted() {
    //获取数据
    console.log(this.StarsDta);
    this.getStarsData(this.StarsDta);
    this.chart = Echarts.init(this.$refs.map);
    let DataJson = require('./mapData/china.json')
    Echarts.registerMap("china", DataJson);
  },

}
</script>
<style>
.map {
  width: 1300px;
  height: 700px;
}
</style>

