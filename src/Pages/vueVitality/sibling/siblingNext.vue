<template>
    <div class="box">
        <div class="heziNext " v-show="changingOver"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      changingOver: true
    };
  },
  created() {
    this.$root.bus.$on("changingOver", msg => {
      console.log(msg);
      this.changingOver = msg;
    });
  }
};
</script>
<style>
.heziNext{
    height: 200px;
    width: 300px;
    background: #ddd
}
</style>

