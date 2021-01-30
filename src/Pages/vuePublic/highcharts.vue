<template>
  <div>
    <highcharts :options="options" ref="circular"></highcharts>
  </div>
</template>
<script>

export default {
  data() {
    return {
      width: 500,
      height: 500,
      options: {
        chart: {
          type: 'pie',
          options3d: { //设置3d效果
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
  },
  mounted() {
    let _this = this
    var resizeTicket = ''
    //刷新地图
    // clearTimeout(resizeTicket); //清空定时器
    resizeTicket = setTimeout(() => {
      _this.$refs.circular.chart.reflow();
    }, 1000)
    //加载数据
    _this.getCoverageList();
  },
  methods: {
    getCoverageList() {

    }
  },
}
</script>
