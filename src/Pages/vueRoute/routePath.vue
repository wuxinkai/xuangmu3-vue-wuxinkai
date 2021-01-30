<template>
<div>
    <div class="clearfix">
     <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>url路由传递参数： -- {{this.$route.query.name}} -- {{this.$route.query.age}}岁-- {{this.$route.query.sex}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="sendQuery">query切换参数</el-button>
        </div>
        <div v-for="(o,index) in 4" :key="o" class="text item">
          <router-link :to="{path:'/vueRoute/routePath/routeSon1', query: {name: '杨洋', age: 26 + o, sex: '男'}}">命名路由query传参/,属于url传递参数。刷新不会消失 {{27+index}} </router-link>
        </div>
     </el-card>
     <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>post传递参数：命名路由params传参routeSon2</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="sendParams">params参数</el-button>
        </div>
        <div v-for="(o,index) in 1" :key="o" class="text item">
          <router-link :to="{name:'routeSon2',params:{dataObj:{name:'邓超',age:18 + o,sex:'男'}}}">命名路由params传参routeSon{{index}}</router-link>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>$route底下的参数</span>
        </div>
        <div> 
          <p>$route.query.xxx 查询参数</p>
          <p>$route.params.xxx 接收参数参数</p>
          <p>$store.state vuex 的方法</p>
          <p>$store.commit vuex 提交修改内容</p>
          <br>
          路由两个表情router-view和
        </div>
      </el-card>
       <br>
    </div>
    <br>
   
    <div>
      <router-view class="view"></router-view>
    </div>
    <p>实现页面跳转的三种方式</p>
    <p>$router.push('name')</p>
    <p>$router.push({path:'name'})</p>
    <p>传参数 $router.push({path:'name?a=123'})</p>
    <p>传参数 $router.push({path:'name',query:{a:123}})</p>
    <p>传参数 $router.go(1)</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      a: 1,
      objPath: {
        name: '杨妮',
        age: 22,
        sex: '女'
      },
      dataObj: {
        name: '鹿晗',
        age: 18,
        sex: '男'
      }
    }
  },
  methods: {
    sendQuery() {
      this.$router.push({
        path: '/vueRoute/routePath/routeSon1',
        query: this.objPath
      })
    },
    sendParams() {
      this.$router.push({
        name: 'routeSon2',
        params: {
          dataObj: this.dataObj
        }
      })
    }
  }
}
</script>

<style scoped>
.bar {
  width: 100%;
  height: 200px;
  background: #ccc;
  margin-top: 50px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
  float: left;
  margin-right: 20px;
}
</style>
