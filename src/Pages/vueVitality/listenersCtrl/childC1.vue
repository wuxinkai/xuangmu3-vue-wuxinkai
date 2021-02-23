<template>
  <div>
    <p class="box2">孙子
      <button @click="zuishangcheng3">孙子2点击事件</button>
    </p>
  </div>

</template>
<script>

export default {

  data() {
    return {
      msg: "孙子1组件"
    }
  },

  methods: {
    zuishangcheng3() {
      this.$emit('test3', this.msg);
    },
  }
};
</script>
<style scoped>
.box2 {
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
}
</style>

