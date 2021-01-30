<template>
    <div>
      <p>接收params传的参数,刷新页面会丢失数据</p>
     <ul>
      <li>{{msg.name}}</li>
      <li>{{msg.age}}</li>
      <li>{{msg.sex}}</li>
    </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
    created() {
      // 取到路由带过来的参数
      let routerParams = this.$route.params.dataObj
      // 将数据放在当前组件的数据内
      this.msg = routerParams
      console.log(this.msg)
    }
}
</script>

<style scoped>
.home {
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 10px;
  background: rgba(64, 158, 255, 0.35);
  padding: 20px;
}
ul {
  list-style: none;
}
li {
  height: 30px;
  line-height: 30px;
  background: pink;
  margin-bottom: 2px;
}
</style>
