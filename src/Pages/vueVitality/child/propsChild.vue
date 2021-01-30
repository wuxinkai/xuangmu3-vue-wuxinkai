<template>
    <div class="box">
     <h3>这是子组件</h3>
     <p>父页面传过来的 <span class="red">{{babai}}</span></p>
     <ul>
        <li v-for="a in qianduan " :key="a.bootstrap">{{a.bootstrap}}</li>
      </ul>
      <el-button  type="danger" @click="getMoney"> 点击触发父组件事件，400改成800</el-button>
        <br>
    <br>
    <div v-show="flag">---------这是子组件的内容，组件关闭这个方法-----------</div>
    <div :class="{red:!flag}">{{text}}</div>
    <div class="lastDiv">通过：this.$refs.parenClick.$el.children来设置颜色,页面加载就执行</div>
    <br>
    <p><span class="red">（通过事件）子组件调用 父组件上的方法 this.$parent.parentMsg</span></p>
    <el-button  type="danger" @click="getParentData"> 获取父组件上的值</el-button>
    <span>父元素中的数据：{{parentData}}</span>
    </div>
</template>
<script>
export default {
  // props接收父组件的方法
  props: ["qianduan",'babai'], //从父元素传递过来的内容
  name: "refsChild_in", //不能删除 在父组件有应用到, 父组件调用子组件数据
  data(){
      return{
          text:"这是字内容",
          flag:true, 
          names:'12345678987654321',
          msg:'这是传递到父组件的值通过  name: "refsChild_in", 和  this.$children', //在父标签直接用
          parentData:''
      }
  },
  methods:{
      //传递给父组件调用父组件上的方法
      getMoney(){
          this.$emit('child-msg',800)
      },
      //被父自己调用
      childHide(){
          this.flag =false;
          this.text ='子内容被修改';
      },
      //这个方法被父元素调用,把值传递给父元素
        changeName(name) {
          this.$set(this, 'names', name)
        },

        //这是子元素调用父元素上的数据
        getParentData() {
            this.$set(this, 'parentData', this.$parent.parentMsg)
        },
  }
};
</script>
<style>
.red {
  font-size: 16px;
  font-weight: bold;
  color: red;
}
</style>

