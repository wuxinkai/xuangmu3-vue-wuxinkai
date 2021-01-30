<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>哥哥组件</span>
    </div>
    <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="menuChange" >
      <el-menu-item class="p20" :index="item.PATH" v-for="(item,index) in items" :key="index">
        <i :class="item.ICON"></i> 
        <a>{{item.ID}}{{item.NAMES}}</a>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>
<script>
export default {
  props: ['menuItems'],
  data() {
    return {
      msg: '',
      items: [], //一级
      activeIndex: '', //当前激活的二级菜单
    }
  },
  created() {
    let root = this; //设置一个this 把内容存到$root 上
    if (this.items <= 0) {
      this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/routeComp').then((data) => {
        if (data.status == 200) {
          root.$root.items = data.data.data
          this.items = data.data.data
          this.activeIndexClick()

        }
      }).catch(function (err) {
        console.log('没有获取到' + err.message)
      })
    } else {
      this.activeIndexClick()
    }
  },
  methods: {
    menuChange(index) { //index == /vueRoute/routeComp 
      let obj = this.items.filter(function (item) { //items 等于空 方法不执行
        return item.ROUTER_NAME.toLowerCase().indexOf(index.split('/')[3].toLowerCase()) >= 0; //判断是否大于等于 0  如果大于等于说明。两个字符串相等。
      })
      this.$root.menuItem = obj[0].CHILDREN; //二级菜单内容
      //第一次加载页面已经渲染完成，用广播过去
       this.$emit('menuObj',obj[0].CHILDREN)
    },
    activeIndexClick() {
      //this.$route.matched.length - 1 后去最后一级的路由内容，
      this.activeIndex = this.$route.matched[this.$route.matched.length - 1].path //结果： /vueRoute/routeComp/comp1
      //将内容传到一级菜单中
      this.menuChange(this.activeIndex)
    },
  }
}
</script>