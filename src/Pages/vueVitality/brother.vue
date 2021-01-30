<template>
  <div>
      <sibling-prev></sibling-prev>  
      <sibling-next></sibling-next>  
  </div>
</template>
<script>
import siblingNext from "./sibling/siblingNext";
import siblingPrev from "./sibling/siblingPrev";
export default {
  data() {
    return {
      b: "" //先声明
    };
  },
  components: {
    siblingNext,
    siblingPrev
  }
};
</script >
<style>
.checkboxs {
  margin-left: 6px;
}
.t5 {
  margin-top: 5px;
}
.box{
    height: 300px;
    width: 100%;
    margin-top: 30px;
    background: #fff
}
</style>