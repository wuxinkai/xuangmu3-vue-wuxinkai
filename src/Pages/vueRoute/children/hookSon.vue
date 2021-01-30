<template>
  <div class="bar">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>子页面：从父页面通过id传递过来的参数:{{$route.params.id}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item"> 在router/index.js文件下和在当前页面下都可以写钩子函数</div>
      <p class="pl20"> to 代表你要跳转到 的 路由。</p>
      <p class="pl20"> from 当前所在的路由</p>
      <p class="pl20"> next 必须添加否则下面代码不会执行。</p>
      <div class="text item">(1)  beforeRouteEnter(to, from, next){}  :进入路由之前执行的函数。</div>
      <p class="pl20"> 不！能！获取组件实例 `this`,因为当守卫执行前，组件实例还没被创建</p>
      <p class="pl20"> 页面刷新就行执行这个方法，</p>
      <div class="text item">(2)  beforeRouteUpdate(to, from, next){}  :在当前路由改变，但是该组件被复用时调用。</div>
      <p class="pl20"> 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以访问组件实例 `this`</p>
      <p class="pl20"> 页面刷新不会执行这个方法，页面切换的时候会执行这个方法，</p>
       <div class="text item">(3)  beforeRouteLeave(to, from, next){}  :离开路由之前执行的函数。</div>
    </el-card>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      msg: '',
    }
  },
  beforeRouteEnter(to, from, next){
    //下面代码会直接报错
    //  this.$confirm('beforeRouteEnter：进入路由之前执行的函数')
    //     .then(_ => {
    //       next();
    //     })
    //     .catch(_ => {});
    // to 代表你要跳转到 的 路由。
    // from 当前所在的路由
    // 获取不到 `this` 组件还没被创建 
    console.log('(1) beforeRouteEnter:进入路由之前执行的函数。获取不到 `this` 组件还没被创建 ')
    next() //必须加上next() 否则下面代码不会执行
  },
  beforeRouteUpdate(to, from, next) {  // 在当前路由改变，但是该组件被复用时调用
    //可以访问到this
    // this.$confirm('在当前路由改变，该组件被复用时调用beforeRouteUpdate ' + this.$route.params.id)
    //   .then(_ => {
    //     next();
    //   })
    //   .catch(_ => { });
     console.log('(2)在当前路由改变，该组件被复用时调用beforeRouteUpdate,可以访问到 `this`')
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave(to, from, next) { //离开路由之前执行的函数。
    // this.$confirm('离开路由之前执行的函数。? [beforeRouteLeave]')
    //   .then(_ => {
    //     next();
    //   })
    //   .catch(_ => {});
    console.log('(3)离开路由之前执行的函数')
    next();
  },
}
</script>
<style scoped>
.text {
  font-size: 16px;
}
.pl20 {
  margin-left: 20px;
  margin-top: 6px;
  font-size: 14px;
}
.item {
  padding-top: 6px;
}
</style>
