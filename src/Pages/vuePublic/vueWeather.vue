<template>
  <div>
    <img style="width:44px" :src="setImg(weatherImg)" alt="">
    <div class="now-time">秦皇島</div>
    <div class="now-time" v-if="weather">{{weather}}</div>
    <div class="now-time" v-else><i class="no-weather">未获取到天气</i></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "vueUpload",
  data() {
    return {
      progs: null,
      content: null,
      weather: '',
      weatherImg: '',
    }
  },
  mounted() {
    this.page()
  },
  methods: {
    ...mapActions(['getWeatherData']),
    change: function () {
      console.log(this.progs)
    },
    page: function () {
      let param = `秦皇岛市`
      // this.http.get('').then((data) => {
      //   if (data.status == 200) {
      //     debugger

      //   }
      // }).catch(function (err) {
      //   console.log('获取菜单失败' + err.message)
      // })

      // 代理的跨越地址在 D:\1项目资料\vue-AnLi\vueWuxinkai\config\index.js
      //https://free-api.heweather.net/s6/weather/now
      
      this.$axios.get(`?location=${param}&key=fec79ff1f8454d72b9d92486f43cb571`)
        .then(res => {
          if (res) {
            let now = res.data.HeWeather6[0].now;
            this.weather = now.tmp + '℃ ';
            this.weatherImg = now.cond_code
          } else {
            this.$Message.error('获取天气失败');
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //转义图片
    setImg(img) {
      if (/\b2/.test(img)) {
        return require(`../../../static/images/weather/200d.png`)
      }
      if (img) {
        return require(`../../../static/images/weather/${img}d.png`)
      } else {
        return require(`../../../static/images/weather/999d.png`)
      }
    },
  }
}
</script>

<style scoped>
</style>
