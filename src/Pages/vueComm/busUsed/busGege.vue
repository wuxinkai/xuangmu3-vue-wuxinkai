<template>
    <div class="left">
      <h3>子组件,哥哥组件</h3>
      <p>哥哥传送给弟弟内容</p>
      <div><el-button @click="changeLike">向兄弟组件传值通过中央事件总线控制</el-button></div>
      <br>  
      <div>{{a}}</div>
    </div>
</template>

<script>
    import bus from "&/common/bus";

    export default {
       data(){
         return{
          a:'这是我的哥哥的内容传递给弟弟组件'
         }
       },
      computed:{

      },
      methods:{
        changeLike(){
          console.log('这是传递弟弟的内容')
          bus.$emit('changeLike',this.a)
        }
      }
    }
</script>

<style scoped>
  .left{height: 300px;width:45%;margin-right: 15px;padding: 20px;border: 1px solid #ccc;float: left}
</style>
