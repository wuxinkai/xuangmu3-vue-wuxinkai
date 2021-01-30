<template>
    <div>
      <p class="p">问题：页面不跟着试刷数据</p>
       <Pedar></Pedar>
       <Children class="mt30" :menuItems='this.$root.menuItem'></Children>
       <router-view class="view"></router-view>
    </div>
</template>
<script>
// 引入同级的vue文件
import Pedar from './comp/pedar' //父
import Children from './comp/children' //子
export default {
  data() {
    return {
      collapse: false //（2）传递者 父页面，
    }
  },
  components: {
    Pedar,
    Children
  },
}
</script >

<style scoped>
.p{font-size: 40px;color: red}
.mt30 {
  margin-top: 30px;
}
.view {
  width: 100%;
  height: 300px;
  line-height: 300px;
  background: #ccc;
  margin-top: 30px;
  text-align: center;
  font-size: 40px;
}
</style>

