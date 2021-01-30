<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>获取当前时间</h3>
      </div>
      <div class="timeGrid">
        <img :src="getTime.year_1" alt="">
        <img :src="getTime.year_2" alt="">
        <img :src="getTime.year_3" alt="">
        <img :src="getTime.year_4" alt="">
        <img src="/static/images/点.png" alt="">
        <img :src="getTime.month_1" alt="">
        <img :src="getTime.month_2" alt="">
        <img src="/static/images/点.png" alt="">
        <img :src="getTime.days_1" alt="">
        <img :src="getTime.days_2" alt="">
        <img class="ml5" :src="getTime.hour_1" alt="">
        <img :src="getTime.hour_2" alt="">
        <img src="/static/images/数冒.png" alt="">
        <img :src="getTime.min_1" alt="">
        <img :src="getTime.min_2" alt="">
        <img src="/static/images/数冒.png" alt="">
        <img :src="getTime.sec_1" alt="">
        <img :src="getTime.sec_2" alt="">
      </div>
    </el-card>

    <br>
    <br>
    <br>
    <br>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>获取当前一周的时间</h3>
      </div>
      <div v-for="o in dates" :key="o" class="text item">
        {{ o }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dates: []
    }
  },
  mounted() {
    let d = new Date()
    var currentDate = new Date(d)
    var timesStamp = currentDate.getTime();
    var currenDay = currentDate.getDay();

    for (var i = 0; i < 7; i++) {
      this.dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
    }
    console.log(dates)

    // 调用一下定时器
    this.nowTimes()
  },
  mounted: {
    //显示当前时间（年月日时分秒）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      this.nowDate = year + "年" + month + "月" + date + "日";
      this.nowTime = hh + ":" + mm + ':' + ss;
      let dateString = year + "-" + month + "-" + date + " " + " " + hh + ":" + mm;
      var dateObject = new Date(dateString);
      let curWeek = dateObject.getDay()
      var dw = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日")
      this.nowWeek = dw[curWeek - 1]
    },
  },
  nowTimes() {
    this.timeFormate(new Date());
    setInterval(this.nowTimes, 1000);
    this.clear()
  },
  clear() {
    clearInterval(this.nowTimes)
    this.nowTimes = null;
  },
  created() {
    setInterval(() => {
      let d = new Date()
      let tmp = {}
      let year = d.getFullYear().toString()//获取的是年
      tmp['year_1'] = `/static/images/数字${year.substring(0, 1)}.png`
      tmp['year_2'] = `/static/images/数字${year.substring(1, 2)}.png`
      tmp['year_3'] = `/static/images/数字${year.substring(2, 3)}.png`
      tmp['year_4'] = `/static/images/数字${year.substring(3, 4)}.png`
      let month = (d.getMonth() + 1).toString() //获取月
      tmp['month_1'] = `/static/images/数字${month.substring(0, 1)}.png`
      tmp['month_2'] = `/static/images/数字${month.substring(1, 2)}.png`
      let days = d.getDate().toString() //获取日
      tmp['days_1'] = `/static/images/数字${days.substring(0, 1)}.png`
      tmp['days_2'] = `/static/images/数字${days.substring(1, 2)}.png`
      //字符串从 后向前截取，两位 给方法补零写法
      let hour = ('000' + d.getHours()).substr(-2) //小时
      tmp['hour_1'] = `/static/images/数字${hour.substring(0, 1)}.png`
      tmp['hour_2'] = `/static/images/数字${hour.substring(1, 2)}.png`
      let min = ('000' + d.getMinutes()).substr(-2)
      tmp['min_1'] = `/static/images/数字${min.substring(0, 1)}.png`
      tmp['min_2'] = `/static/images/数字${min.substring(1, 2)}.png`
      let sec = ('000' + d.getSeconds()).substr(-2)
      tmp['sec_1'] = `/static/images/数字${sec.substring(0, 1)}.png`
      tmp['sec_2'] = `/static/images/数字${sec.substring(1, 2)}.png`



      // vuex设置this.$store.dispatch更新没有同步到组件created(){}方法里面
      this.$store.dispatch('screen/setTimes', tmp).then(datas => {
        // console.log(datas)
      }).catch(err => {
        console.log(err)
      })
    }, 500)
  },
  computed: {
    getTime() { //接受vuex 发给来的值
      //vuex 的获取 this.$store.getters
      return this.$store.getters["screen/getTimeObj"]
    },
  }
}
 //vuex 的获取 this.$store.getters
 //传给vuex 值 this.$store.dispatch
</script>

<style scoped>
.item {
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  color: #666;
}
</style>
