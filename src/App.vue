<template>
  <div id="app">
    <!-- 第二层内容 -->
    <!--keep-alive 走缓存  在meta属性上定义一个keepAlive，-->
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      beforeUnload_time: 0,
      gap_time: 0
    }
  },
  watch: {
    '$route'(newData, lodData) {
      console.log(newData, lodData)
    }
  },
  mounted() {
    //利用时间差关闭浏览器
    let beginTime = 0;//开始时间
    let differTime = 0;//时间差
    window.onunload = function () {
      differTime = new Date().getTime() - beginTime;
      if (differTime <= 5) {
        Cookies.remove('CommData')
      };
    };
    window.onbeforeunload = function () {
      beginTime = new Date().getTime();
    };
  },
}
</script>

<style>
/*引入全局css*/
@import "../static/css/main.css";
@import "../static/css/color-dark.css";
</style>
