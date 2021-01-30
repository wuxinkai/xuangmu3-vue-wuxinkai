<template>
  <div>
    <div class="hello" ref="homePage">//设置最外层div的ref属性
      <br>
      <div class="top-row" style="float:left"> </div>
      <div :style="'width:200px;background:pink;float:left;height:'+this.$root.$data.windowHeight+'px'"> </div>
      <div style="width:200px;background:green;float:left" class="top-row2">1111111111111</div>
      <div style="width:200px;background:blue;float:left;height:50%" ref="boxHeightDiv">设置页面高度50%，监听他的高度</div>
    </div>
  </div>
</template>
<script>
import { clientHeight2 } from "@/utils/windowsHeight";
export default {
  data() {
    return {
      wendangHeight: '',
      //监听页面高度的变化

    }
  },
  mounted() { //页面初始化完成执行的事件
    //从外部引入
    let topRow = document.querySelector(".top-row")
     clientHeight2(topRow, 382)

    //从main.js中获取高度
    console.log(this.$root.$data.windowHeight);


    // this.initHeight() //页面加载的时候执行一次

    //---------------------第二种办法---------注释的是第一种办法-----------------------
    let _this = this
    // （1）获取浏览器可视区域高度
    this.wendangHeight = document.documentElement.clientHeight;
    window.onresize = function () {
      //（2）页面大小改变就会出发watch的wendangHeight监听数据，
      _this.wendangHeight = document.documentElement.clientHeight;
      _this.changeFixed(_this.wendangHeight);
    }

    // console.log(this.$refs.boxHeightDiv.style.height);
  },
  watch: {//检测值的变化
    // clientHeight() {
    //   this.changgeFixed(this.clientHeight)
    // }
    //---------------------第二种办法--------------------------------
    //（3）数值变化就调用methods里的changeFixed方法
    wendangHeight: function () {
      this.changeFixed(this.wendangHeight);
    }
  },
  methods: { //绑定的事件
    // changgeFixed(clientHeight) {  //动态设置高度
    //   this.$refs.homePage.style.height = clientHeight + 'px'
    //   //通过dom操作项目
    //   document.querySelector(".top-row").style.height = clientHeight - 100 + "px";
    // },
    // initHeight() {
    //   this.clientHeight = document.body.clientHeight - 180;
    //   window.onresize = () => { //在事件中执行事件
    //     debugger
    //     //this是window
    //     this.clientHeight = document.body.clientHeight - 180;
    //   }
    // }

    //---------------------第二种办法--------------------------------
    //（4）从新给元素赋值
    changeFixed(clientHeight) {
      this.$refs.homePage.style.height = clientHeight - 200 + 'px'
      document.querySelector(".top-row2").style.height = clientHeight - 360 + "px";
    },
  }
}
</script>
<style>
.hello {
  /* width: 200px;
  height: 200px; */
  background: #ccc;
}

.mybox2 {
  width: 300px;
  height: 200px;
  background: pink;
}
.top-row {
  width: 200px;
  height: 200px;
  background: red;
}
</style>
