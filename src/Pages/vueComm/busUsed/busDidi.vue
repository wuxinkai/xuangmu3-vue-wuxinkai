<template>
    <div class="right">
      <h3>子组件,弟弟组件</h3>
      <p>{{gegeData}}</p>
      <br> 
      <br> 
   
    </div>
</template>

<script>
import bus from '&/common/bus'
export default {
  data() {
    return {
      gegeData: '弟弟的默认数据',
      b:'给哥哥的数据'
    }
  },
  mounted() { //$on 中的this 指向的不是this  所以需要存储变量
    let _this = this;
    //  bus是另一个实例，所以实例不同this也不同
    bus.$on('changeLike', function (newLike) {
      _this.$set(_this, 'gegeData', newLike)
    })
  },
}
</script>

<style scoped>
.right {
  height: 300px;
  width: 45%;
  margin-right: 15px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}
</style>
