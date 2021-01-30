<template>
  <div>
    <el-row>
      <el-button @click="getMessageBox">全局确认组件</el-button>
      <el-button @click="getGlobalFun" type="primary">调用全局函数</el-button>
      <el-button @click="getloading" type="success">加载loading组件</el-button>
      <el-button @click="cancelloading" type="info">关闭loading组件</el-button>
      <el-button @click="getToast" type="warning">开启loading</el-button>
      <el-button @click="cancelToast" type="danger">关闭loading组件</el-button>
      <br>
      <br>
      <br>
      <el-button @click="getMessageBox2" type="danger">全局确认组件</el-button>
    </el-row>

  </div>
</template>

<script>

import { messageBox } from "&/globalMessage/index2.js";


export default {
  components: {

  },
  data() {
    return {

    };
  },
  methods: {
    //在min中注册获取弹出框
    getMessageBox() {
      this.$global_message.handleShowMessage(
        {
          title: "定位",
          content: "北京",
          cancel: "取消",
          ok: "切换定位",
          handleCancle(data) {
            console.log(1)
          },
          handleOk(data) {
            console.log(2)
          }
        })
    },
  // 引入 import { messageBox } from "&/globalMessage/index2.js" 后应用
    getMessageBox2() {
      messageBox({
        title: "定位2",
        content: "北京2",
        cancel: "取消2",
        ok: "切换定位2",
        handleCancle() {
          console.log(1)
        },
        handleOk() {
          console.log(2)
        }
      })
    },
    //获取全局函数
    getGlobalFun() {
      this.globalFunc_one('这是一个全局函数，在 vueJs 页面引入')
    },
    //获取loading  用两种  loading  和 toast  //注意这里的this指向的是全局对象VUE
    getloading() {
      this.$global_loading.show('loading')
    },
    cancelloading() {
      this.$global_loading.hide()
    },
    getToast() {
      this.$global_loading.show('toast')
    },
    cancelToast() {
      this.$global_loading.hide()
    }
  },
  mounted() {


  }
};

</script>

<style lang="scss" type="text/scss" scoped>
</style>
