<template>
  <div>
    <p class="box2">儿子
      <button @click="toParent">儿子点击事件</button>
      <childC class="888" v-bind="$attrs" v-on="$listeners"></childC>
    </p>
  </div>

</template>
<script>
import childC from "./childC";
export default {

  data() {
    return {
      msg: "儿子组件"
    }
  },
  components: {
    childC,
  },
  inheritAttrs: false, //必填
  methods: {
    toParent() {
      this.$emit('test1', this.msg);
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

