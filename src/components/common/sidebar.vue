<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="$route.path" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <img :src="getImgUrl(item.icon)" class="my-icon my-icon-a" alt="">
                <img :src="getImgUrl2(item.icon)" class="my-icon my-icon-b" alt="">
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"  ref="el-menu-item" @click="change(subItem.index)">
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index"  ref="el-menu-item">
              <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
  </div>
</template>
<script>
import dataJson from '@/utils/menuData.json'
export default {
  data() {
    return {
      collapse: false, //（3）被折叠者
      items: []
    }
  },
  //自定义事件
  methods: {
    change(index) {
       var _this = this;
      console.log(index);
        _this.$refs["el-menu-item"].forEach((item) => {
        if (item.index == index) {
          item.$el.style.backgroundColor = "red";
        } else {
          item.$el.style.backgroundColor = "#324157";
        }
      });
    },
    getImgUrl(icon){
      //字符串拼接不成功用require（）实现
      // return require("static/images/A_command.png")
      return `static/images/A_${icon}`
    },
    getImgUrl2(icon){
      return `static/images/B_${icon}`
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$root.bus.$on('collapse', msg => {
      console.log(msg)
      this.collapse = msg
    })
    //请求菜单数据
    // this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData').then((data) => {
    //   if (data.status == 200) {
    //     debugger
    //     this.items = data.data.data?data.data.data:dataJson.data
    //   }
    // }).catch(function (err) {
    //   console.log('获取菜单失败' + err.message)
    // })
  },
  mounted(){
    // console.log(dataJson.data)
    this.items =dataJson.data
  },
   watch: {
      '$route': function (x) { // 监听路由变化
    //  debugger
      //  this.change(this.$route.path)
      }
   }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow: auto;
}
/*.sidebar-el-menu上不带.el-menu--collapse样式的被修改*/
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
.my-icon{
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 2px 5px 0 0;
}
.my-icon-b{
  display: none
}
.el-menu li:hover .my-icon-b{
 display: inline-block
}
.el-menu li:hover .my-icon-a{
 display: none
}
</style>
