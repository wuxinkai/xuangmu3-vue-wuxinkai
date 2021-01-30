<template>
  <div class="header">
    <!--点击图标 折叠内容-->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <!--点击文字折叠内容-->
    <div class="logo" @click="collapseChage">项目基础模板</div>
    <!-- 右侧内容 -->
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator"><img src="static/images/head_icon.jpg"></div>
        <!--  -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
              {{getUserName}} <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="http://www.baidu.com" target="_blank">
              <el-dropdown-item>百度网页</el-dropdown-item>
            </a>
            <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
            <el-dropdown-item divided  command="loginout2">登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapse: false, //（1）点击处 ，折叠按钮
      fullscreen: false, //是否全屏
      name: 'admin', //用户名字
      message: 2, //判断有没有消息
      getUserName: '小明'
    }
  },
  methods: {
    collapseChage() {    //组件之间的传递方式
      this.collapse = !this.collapse;
      this.$root.bus.$emit('collapse', this.collapse) //发送给父页面的指令 homePage.vue
    },
    handleCommand(command) { //退出登录
      localStorage.removeItem("localMenus") //清楚routeStorage.vue的缓存菜单
      if (command === 'loginout') {
        this.$router.push('/login')
      }
    },
    handleFullScreen() { //是否全屏
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) { // exitFullscreen() 退出全屏模式。
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) { //跨浏览器退出全屏
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) { //requestFullscreen() 请求进入全屏模式
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  /* float: left; */
  /* width:250px; */
  display: inline-block;
  line-height: 70px;
  cursor: pointer;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>