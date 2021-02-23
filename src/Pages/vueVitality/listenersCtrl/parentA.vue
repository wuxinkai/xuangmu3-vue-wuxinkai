<template>
  <div  class="box2">
    <p>
    <p>父亲</p>
    <p>父页面接收**** {{test1}}</p>
    <p>父页面接收**** {{test2}}</p>
    <p>父页面接收**** {{test3}}</p>
    <childB @test1="handleDest1" @test3="handleDest3" @test2="handleDest2" v-bind="$attrs" v-on="$listeners" class="777"></childB>
    </p>
  </div>

</template>
<script>

import childB from "./childB";
export default {
  data() {
    return {
      test2: '',
      test1: '',
      test3: ''
    }
  },
  inheritAttrs: false, //必填
  components: {
    childB,
  },
  methods: {
    handleDest1(data) {
      this.test1 = data
    },
    handleDest2(data) {
      this.test2 = data
    },
    handleDest3(data) {
      this.test3 = data
    }
  }
};
</script>
<style scoped>
.box2 {
  width: 600px;
  height: 500px;
  border: 1px solid #ddd;
}
</style>

