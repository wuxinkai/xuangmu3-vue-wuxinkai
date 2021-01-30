<template>
  <div>
    <div>生命周期：<h2>在控制台查看</h2></div>
    <br>
    <h2>（1）生命周期的用途</h2>
    <ul>
      <li>beforeCreate 实例刚刚被创建</li>
      <li>created 实例创建完成</li>
      <li>beforeMount 模版编译之前</li>
      <li>mounted 模版编译完成</li>
      <li>beforeUpdate 数据更新前</li>
      <li>updated 数据更新够完成</li>
      <li>beforeDestroy 实例被销毁前</li>
      <li>destroyed  实例被销毁</li>
      <li></li>
    </ul>
    <h2>（2）beforeUpdate 和updated更新数据前后触发的钩子</h2>
     <el-button type="primary" @click="btndata()">页面创建和创建完成</el-button>
     <div>
       {{msg}}
     </div>
     <br>
      <!-- <h2>(3) beforeMount 和 updated 绑定数据前后</h2>
      <el-button type="primary" @click="btnshuju()">绑定数据，模版渲染</el-button>
      <div>
        {{shuju}}
      </div> -->
     <br>
     <h2>（4）beforeDestroy和destroyed组件销毁的用途，在子组件页面执行这两个事件</h2>
     <p>当我我们在组件里面填写表单没有保存，我们要退出这个页面的时候要保存用户填写的信息，保存内容就在beforeDestroy和destroyed里写</p>
       <el-button type="primary" @click="boxif=false">查看控制台，销毁实例，触发</el-button>
       <br>
     <h2>（5）beforeCreate 和created </h2>
     <p>我们创建一个组件，希望组件局部刷新的时候触发这两个事件</p>
      <el-button type="primary" @click="boxif=true">查看控制台，创建实例</el-button>
   
     <br>
         <zujian v-if="boxif"></zujian>  
  </div>
</template>
<script>
import zujian from "./zujian/zujian";
export default {
  components:{
    zujian
  },
  data() {
    return {
      /****数据对象****/
      message: 'Hello World',
      boxif:true,
      shuju:'',
      msg:"数据更新会触发，beforeUpdate 数据更新前，updated 数据更新够完成 事件"
    }
  },
  computed: {
    /****实现某一属性的实时计算****/
    message1: function () {
      return this.message.split("").reverse().join("");
    }
  },
  watchd: {
    /****检测某一属性值的变化****/
  },
  methods: {
    /****组件内部的方法****/
    //更新数据
    btndata(){
      this.msg ='更新后看控制台'
    },
    //绑定
    btnshuju(){
     let _this =this
      setTimeout(function(){
        _this.shuju= '延时绑定数据触发，渲染模版事件'
      },1000)
    }
//创建或者销毁实例
  },
  beforeCreate: function () {
    console.group("------beforeCreate创建前状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
    console.log("%c%s", "color:red", "message: " + this.message); //undefined
  },
  /**
   * 1.在beforeCreate和created钩子之间，程序开始监控Data对象数据的变化及vue内部的初始化事件
   *
   * */
  created: function () {
    console.group("------created创建完毕状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  /**
   * 2.在created和beforeMount之间，判断是否有el选项，若有则继续编译，无，则暂停生命周期；
   * 然后程序会判断是否有templete参数选项，若有，则将其作为模板编译成render函数。若无，则将外部html作为模板编译（template优先级比外部html高）
   *
   * */
  beforeMount: function () {
    console.group("------beforeMount挂载前状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  /**
   * 3.在beforeMount和mounted之间，程序将上一步编辑好的html内容替换el属性指向的dom对象或者选择权对应的html标签里面的内容
   *
   * */
  mounted: function () {
    console.group("------mounted 挂载结束状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  /**
   * 4.mounted和beforeUpdate之间，程序实时监控数据变化
   *
   * */
  beforeUpdate: function () {
    console.group("beforeUpdate 更新前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  /**
   * 5.beforeUpdate和updated之间，实时更新dom
   *
   * */
  updated: function () {
    console.group("updated 更新完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
 
  /**
   * 6.实例beforeDestroy销毁前，destroyed销毁
   *
   * */
   beforeDestroy: function () {
    console.group("beforeDestroy 销毁前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },

  destroyed: function () {
    console.group("destroyed 销毁完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  }
};
</script>
<style>
ul{
  list-style: none;
}
ul li{
  margin-top: 6px;
}
</style>
