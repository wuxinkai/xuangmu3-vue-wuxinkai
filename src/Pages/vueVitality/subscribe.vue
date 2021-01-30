<template>
 <div>
     <p>发布emit 订阅on</p>
     <p>订阅发布模式：定义了一种一对多的依赖关系，让多个订阅者对象同时监听某一个主题对象</p>
     <p>$on绑定事件：监听当前实例上的自定义事件，事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。</p>
     <p>$once。只绑定一次，</p>
     <p>$off，解除绑定</p>
     <p>$emit，发布</p>

     <br>
     <br>
        <h2>这是父组件</h2>
        <p>在vue中儿子无法改变父亲组件的值，只能告诉父亲让父亲去改值，单向数据流</p>
        <p><span class="red">传送给子数据(1通过页面加载)：</span> :qianduan='ParentObj' 和v-on:qianduan 写法一样</p>
        <p><span class="red">子组件调用父组件上的方法（通过@）：</span>@child-msg='things' ，就相当于 @child.$on('child-msg',th ings)</p>
        <p>利用事件子组件调用父组件方法，修改伏父组件值，<span class="red">{{money}}</span>元</p>

        <props-child :qianduan='ParentObj' :babai='money' @child-msg='things' ref="parenClick"></props-child>
     
     <br>
    <p><span class="red">父组件，调用子组件的方法：</span>通过在属性上增加ref来实现</p>
    <el-row>
        <el-button type="primary" @click="fuDiaoZiShiJian">点击关闭子组件的内容和传值</el-button>
    </el-row>
    <br>
    <p><span class="red">父组件, 获取子组件的值</span>通过this.$children 和 child.$options.name</p>
    <div>
        <el-button type="success" @click="getChildData">获取子组件上的值</el-button>
    </div>
    <p>这是从子组件传递过来的数据 {{childMsg}}</p>
    </div>
</template>
<script>
import propsChild from "./child/propsChild"; //1引入子组件
// import propsWushi from "./child/propsWushi"; //1引入子组件
export default {
  data() {
    return {
      mag: "这是父元素的数据",
      money: "400",
      wushiS: "50",
      ParentObj: [
        { bootstrap: "子组件获取父组件内的值" },
        { bootstrap: "第一名bootstrap" },
        { bootstrap: "第二名react" },
        { bootstrap: "第三名vue" }
      ],
        childMsg: '', //值传到父元素
        parentMsg: '这是父元素数据被子元素调用',
    };
  },
  methods: {
    //子组件调用父组件事件
    things(val) {
      this.money = val;
    },
    //父组件调用子组件事件
    fuDiaoZiShiJian() {
      this.$refs.parenClick.childHide();
    },
      //获取子元素上的内容
        //for...of 语句创建一个循环来迭代可迭代的对象。
      getChildData(){
          for (let child of this.$children) {
            // child 就相当于子组件
            // child.$options.name 获取的是当前子组件的  name: "refsChild_in"
            // 上面会有按钮组件
            if(child.$options.name =='refsChild_in'){ //el-button 也是一个组件所有需要判断
              this.$set(this, 'childMsg', child.msg) //给this添加自定义属性，
            }
          }
          // console.log(this)
        },
  },
  mounted() {
    // 页面加载完成要执行的方法
    //设置子属性上的颜色
    this.$refs.parenClick.$el.children[
      this.$refs.parenClick.$el.children.length - 1
    ].style.color = "blue";
    this.$refs.parenClick.$el.style.background = "#c1c1c1";
  },
  components: {
    //2引入组件
    propsChild
    // propsWushi
  }
};
</script>
<style scoped>
.box {
  width: 70%;
  background: #fff;
  margin: 0 auto;
  color: #333;
  padding: 20px;
}
.red {
  font-size: 16px;
  font-weight: bold;
  color: red;
}
ul {
  list-style: none;
}
</style>

