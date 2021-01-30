<template>
    <div>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>钩子函数</span>
            
          </div>
          <div  class="text item">
            <router-link to="/vueRoute/routeHook/hookSon/1">router-link路由钩子1</router-link>
          </div>
          <div  class="text item">
             <router-link to="/vueRoute/routeHook/hookSon/2">router-link路由钩子2</router-link>
          </div>
      </el-card>
      <!-- 路由跳转 -->
      <router-view class="contentIn"></router-view>
    </div>
</template>

<script>
    export default {
       data(){
         return{
           mas:'q'
         }
       },
    }
</script>

<style scoped>
.contentIn{
  width: 100%;
  padding: 20px;
  margin-top: 50px;
}

.text {
  font-size: 14px;
}

.item {
  padding-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-right: 20px;
}
</style>