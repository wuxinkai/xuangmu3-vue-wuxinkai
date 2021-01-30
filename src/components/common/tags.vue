<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item, index) in tagsList" :class="{'active':isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
    <!--右侧信息-->
      <div class="tags-close-box">
        <el-dropdown @command="handleTags">
          <el-button size="mini" type="primary">
            标签选项<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu size="small" slot="dropdown">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagsList: []  //添加进来的数据
    }
  },
  created() { //第一步 ，执行时间
    this.setTags(this.$route)
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0 // 列表不为空的时候才显示，
    }
  },
  methods: {
    //向数组添加内容
    setTags(route) { //第二步 对比当前路由和数组的路由是否相同，
      const isExist = this.tagsList.some(item => {
        //some() 方法用于检测数组中的元素是否满足指定条件
        //some() 方法会依次执行数组的每个元素 
        //(1)如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
        //(2)如果没有满足条件的元素，则返回false
        //注意：some() 不会对空数组进行检测，some() 不会改变原始数组
        return item.path === route.path
      })
      !isExist && this.tagsList.push({ //没有相同的就往里面添加
        title: route.meta.title,
        path: route.path
      })
    },
    //第三步 添加样式
    isActive(path) { //传递过来的内容和当前路径相同就添加样式
      return path === this.$route.path
    },
    //第四部 删除标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0] //进入第一组数据
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1] //判断
      if (item) { //注意  this.$route 和  this.$router的应用 多了一个 r
        delItem.path === this.$route.path && this.$router.push(item.path)
      } else { //删掉最后一个的时候，让他等于 首页
        this.$router.push('/')
      }
    },
    //第五步 右侧内容切换的方法
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    closeOther() { //关闭其他标签,只剩下自己
      const curItem = this.tagsList.filter(item => { //
        return item.path === this.$route.path; //数组路径和 当前页面路由做对比 ，
      })
      this.tagsList = curItem;
    },
    closeAll() {//关闭全部标签
      this.tagsList = [];
      this.$router.push('/')

    }
  },
  watch: { //只有页面跳转的时候才会执行这个方法
    $route(newValue, oldValue) {
      // debugger
      this.setTags(newValue) //页面跳转的时候向页面增加内容
    }
  }
}
</script>

<style scoped>
.tags {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
  border: 1px solid #409eff;
  background-color: #409eff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
