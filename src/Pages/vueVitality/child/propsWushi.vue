<template>
    <div class="box">
     <h3>这是子组件2</h3>
     <p>{{wushi}} </p>
      <button @click="getMoney2"> 点击触发父组件事件，50改成1200</button>
    </div>
</template>
<script>
export default {
  props: ["wushi"], 
  data(){
      return{
          a:"1"
      }
  },
  methods:{
      getMoney2(){
          this.$emit('updata:wushi',1200)
      }
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

