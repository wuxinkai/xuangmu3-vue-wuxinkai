<template>
  <div>
    <p class="box2">孙子
      <button @click="zuishangcheng">孙子点击事件</button>
    </p>
  </div>

</template>
<script>

export default {

  data() {
    return {
      msg: "孙子组件"
    }
  },

  methods: {
    zuishangcheng() {
      this.$emit('test2', this.msg);
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

